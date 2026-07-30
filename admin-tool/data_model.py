"""Canonical data model for the verzekeraars (health insurer reimbursement) data.

The live verzekeraars-data.js on the website server is the source of truth for the
"old" data. The app downloads it via FTP and parse_js() reads it back into this
canonical dict shape; generate_js() renders a (possibly edited) dict back into JS
deterministically for upload — Claude only ever supplies data values, never
JavaScript syntax, so a malformed model response can't break the live site's script.
"""
import json
import os
import re
from urllib.parse import urlparse

INSURERS = [
    "Zilveren Kruis",
    "CZ",
    "VGZ / IZA",
    "Menzis",
    "DSW / Stad Holland",
    "ONVZ",
    "De Friesland",
]

GEEN_VERGOEDING_SENTINEL = "__GEEN_VERGOEDING__"

# JSON schema for Claude's structured output. Every insurer key is enumerated
# explicitly (rather than using a free-form map) because that's what the
# structured-outputs feature supports reliably.
_PLAN_ITEM_SCHEMA = {
    "type": "object",
    "properties": {
        "naam": {"type": "string"},
        "bedrag": {"type": "string"},
    },
    "required": ["naam", "bedrag"],
    "additionalProperties": False,
}

_LINK_ITEM_SCHEMA = {
    "type": "object",
    "properties": {
        "label": {"type": "string"},
        "url": {"type": "string"},
    },
    "required": ["label", "url"],
    "additionalProperties": False,
}

RESPONSE_SCHEMA = {
    "type": "object",
    "properties": {
        "geen_vergoeding_tekst": {"type": "string"},
        "insurers": {
            "type": "object",
            "properties": {
                name: {"type": "array", "items": _PLAN_ITEM_SCHEMA}
                for name in INSURERS
            },
            "required": INSURERS,
            "additionalProperties": False,
        },
        "links": {
            "type": "object",
            "properties": {
                name: {"type": "array", "items": _LINK_ITEM_SCHEMA}
                for name in INSURERS
            },
            "required": INSURERS,
            "additionalProperties": False,
        },
    },
    "required": ["geen_vergoeding_tekst", "insurers", "links"],
    "additionalProperties": False,
}


def load_json_data(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_json_data(path: str, data: dict) -> None:
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")


def _js_string(value: str) -> str:
    """Render a Python string as a single-quoted JS string literal."""
    escaped = value.replace("\\", "\\\\").replace("'", "\\'")
    return "'" + escaped + "'"


def generate_js(data: dict) -> str:
    """Deterministically render verzekeraars-data.js from the canonical data dict."""
    geen_vergoeding_tekst = data["geen_vergoeding_tekst"]
    alleen_basis_naam = data.get(
        "alleen_basisverzekering_naam",
        "Ik heb alleen een basisverzekering (geen aanvullende verzekering)",
    )

    lines = []
    lines.append("/* VoetSelect — vergoedingengegevens voor de \"Check uw vergoeding\" modal.")
    lines.append("   Indicatieve bedragen, o.b.v. de vergoedingenoverzichten van de")
    lines.append("   verzekeraars zelf. Wijzigt jaarlijks — check bij twijfel de eigen")
    lines.append("   polisvoorwaarden of het overzicht op podotherapie.nl/vergoedingen.")
    lines.append("   Dit bestand wordt automatisch gegenereerd — bewerk in plaats daarvan")
    lines.append("   verzekeraars-data.json en genereer opnieuw via de admin-tool. */")
    lines.append("")
    lines.append(f"const GEEN_VERGOEDING = {_js_string(geen_vergoeding_tekst)};")
    lines.append(
        "const ALLEEN_BASISVERZEKERING = { naam: "
        f"{_js_string(alleen_basis_naam)}, bedrag: GEEN_VERGOEDING }};"
    )
    lines.append("")
    lines.append("const VERGOEDING_PLANS = {")
    for insurer, plans in data["insurers"].items():
        lines.append(f"  {_js_string(insurer)}: [")
        lines.append("    ALLEEN_BASISVERZEKERING,")
        for plan in plans:
            naam = _js_string(plan["naam"])
            if plan["bedrag"] == GEEN_VERGOEDING_SENTINEL or plan["bedrag"] == geen_vergoeding_tekst:
                bedrag = "GEEN_VERGOEDING"
            else:
                bedrag = _js_string(plan["bedrag"])
            lines.append(f"    {{ naam: {naam}, bedrag: {bedrag} }},")
        lines.append("  ],")
    lines.append("};")
    lines.append("")
    lines.append("/* Officiële vergoedingenpagina's, gebruikt in het resultaat als iemand")
    lines.append("   zijn/haar pakket niet weet. */")
    lines.append("const INSURER_LINKS = {")
    for insurer in data["insurers"]:
        entries = data["links"].get(insurer, [])
        rendered = ", ".join(
            "{ label: %s, url: %s }" % (_js_string(e["label"]), _js_string(e["url"]))
            for e in entries
        )
        lines.append(f"  {_js_string(insurer)}: [{rendered}],")
    lines.append("};")
    lines.append("")
    return "\n".join(lines)


class JsParseError(Exception):
    """Raised when the downloaded verzekeraars-data.js doesn't match the shape
    generate_js() itself produces."""


_TOKEN_RE = re.compile(
    r"""
      \s+
    | /\*.*?\*/
    | //[^\n]*
    | '(?:[^'\\]|\\.)*'
    | [A-Za-z_][A-Za-z0-9_]*
    | [{}\[\]:,;=]
    """,
    re.VERBOSE | re.DOTALL,
)


def _tokenize_js(text: str) -> list[str]:
    tokens = []
    pos = 0
    length = len(text)
    while pos < length:
        m = _TOKEN_RE.match(text, pos)
        if not m:
            raise JsParseError(
                f"Onherkenbaar teken op positie {pos}: {text[pos:pos + 30]!r}"
            )
        tok = m.group(0)
        pos = m.end()
        if tok.isspace() or tok.startswith("/*") or tok.startswith("//"):
            continue
        tokens.append(tok)
    return tokens


class _JsTokenParser:
    """A tiny recursive-descent parser for exactly the JS subset generate_js()
    produces: const declarations, string literals (with \\ and ' escapes), plain
    object/array literals, and the two bare-identifier references GEEN_VERGOEDING
    and ALLEEN_BASISVERZEKERING. Deliberately not a general JS parser/eval — it
    only needs to round-trip our own deterministic output."""

    def __init__(self, tokens: list[str]):
        self.tokens = tokens
        self.i = 0

    def peek(self):
        return self.tokens[self.i] if self.i < len(self.tokens) else None

    def next(self):
        tok = self.peek()
        if tok is None:
            raise JsParseError("Onverwacht einde van bestand.")
        self.i += 1
        return tok

    def expect(self, value: str) -> str:
        tok = self.next()
        if tok != value:
            raise JsParseError(f"Verwachtte '{value}', maar kreeg '{tok}'.")
        return tok

    def skip_to(self, ident: str) -> None:
        while self.peek() is not None and self.peek() != ident:
            self.next()
        if self.peek() is None:
            raise JsParseError(f"Kon '{ident}' niet vinden in het bestand.")

    def parse_string(self) -> str:
        tok = self.next()
        if not (tok.startswith("'") and tok.endswith("'")):
            raise JsParseError(f"Verwachtte een string, maar kreeg '{tok}'.")
        return tok[1:-1].replace("\\'", "'").replace("\\\\", "\\")

    def parse_value(self):
        tok = self.peek()
        if tok is None:
            raise JsParseError("Onverwacht einde van bestand bij het lezen van een waarde.")
        if tok.startswith("'"):
            return self.parse_string()
        if tok == "{":
            return self.parse_object()
        if tok == "[":
            return self.parse_array()
        return self.next()  # bare identifier, e.g. GEEN_VERGOEDING

    def parse_object(self) -> dict:
        self.expect("{")
        obj = {}
        while self.peek() != "}":
            key_tok = self.next()
            key = (
                key_tok[1:-1].replace("\\'", "'").replace("\\\\", "\\")
                if key_tok.startswith("'")
                else key_tok
            )
            self.expect(":")
            obj[key] = self.parse_value()
            if self.peek() == ",":
                self.next()
        self.expect("}")
        return obj

    def parse_array(self) -> list:
        self.expect("[")
        items = []
        while self.peek() != "]":
            items.append(self.parse_value())
            if self.peek() == ",":
                self.next()
        self.expect("]")
        return items


def parse_js(js_text: str) -> dict:
    """Reverses generate_js(): parses a verzekeraars-data.js file back into the
    canonical dict shape (geen_vergoeding_tekst, alleen_basisverzekering_naam,
    insurers, links). Raises JsParseError if the file doesn't match the format
    generate_js() itself produces. Never uses eval()/exec() on the file content."""
    try:
        parser = _JsTokenParser(_tokenize_js(js_text))

        parser.skip_to("GEEN_VERGOEDING")
        parser.next()
        parser.expect("=")
        geen_vergoeding_tekst = parser.parse_string()
        parser.expect(";")

        parser.skip_to("ALLEEN_BASISVERZEKERING")
        parser.next()
        parser.expect("=")
        alleen_obj = parser.parse_object()
        parser.expect(";")
        alleen_basisverzekering_naam = alleen_obj.get(
            "naam", "Ik heb alleen een basisverzekering (geen aanvullende verzekering)"
        )

        parser.skip_to("VERGOEDING_PLANS")
        parser.next()
        parser.expect("=")
        raw_plans = parser.parse_object()
        parser.expect(";")

        parser.skip_to("INSURER_LINKS")
        parser.next()
        parser.expect("=")
        raw_links = parser.parse_object()
        parser.expect(";")
    except JsParseError:
        raise
    except Exception as exc:
        raise JsParseError(f"Kon verzekeraars-data.js niet lezen: {exc}") from exc

    insurers: dict[str, list] = {}
    for insurer, raw_list in raw_plans.items():
        plans = []
        for item in raw_list:
            if item == "ALLEEN_BASISVERZEKERING":
                continue  # implied by the website itself, not part of the editable list
            bedrag = item.get("bedrag", "")
            if bedrag == "GEEN_VERGOEDING":
                bedrag = GEEN_VERGOEDING_SENTINEL
            plans.append({"naam": item.get("naam", ""), "bedrag": bedrag})
        insurers[insurer] = plans

    links: dict[str, list] = {}
    for insurer, raw_list in raw_links.items():
        links[insurer] = [
            {"label": item.get("label", ""), "url": item.get("url", "")}
            for item in raw_list
        ]

    return {
        "geen_vergoeding_tekst": geen_vergoeding_tekst,
        "alleen_basisverzekering_naam": alleen_basisverzekering_naam,
        "insurers": insurers,
        "links": links,
    }


def normalize_model_response(raw: dict) -> dict:
    """Normalize a structured-output response from Claude into the canonical shape,
    substituting the sentinel for any plan whose bedrag matches the no-coverage text,
    and preserving the fixed alleen_basisverzekering_naam."""
    geen_vergoeding_tekst = raw["geen_vergoeding_tekst"]
    normalized = {
        "geen_vergoeding_tekst": geen_vergoeding_tekst,
        "alleen_basisverzekering_naam": (
            "Ik heb alleen een basisverzekering (geen aanvullende verzekering)"
        ),
        "insurers": {},
        "links": {},
    }
    for insurer in INSURERS:
        plans = []
        for plan in raw["insurers"][insurer]:
            bedrag = plan["bedrag"]
            if bedrag.strip() == geen_vergoeding_tekst.strip():
                bedrag = GEEN_VERGOEDING_SENTINEL
            plans.append({"naam": plan["naam"], "bedrag": bedrag})
        normalized["insurers"][insurer] = plans
        normalized["links"][insurer] = list(raw["links"][insurer])
    return normalized


# --- Content validation -----------------------------------------------------
#
# `output_config.format` (structured outputs) constrains the JSON *shape* — types,
# required keys, no extra properties. It does NOT constrain string *content*: a
# "naam" or "bedrag" field is still valid against the schema even if it contains
# "<img src=x onerror=...>". Since this data is ultimately rendered into the page
# (see script.js's vergoeding modal), and since it now comes from an LLM's web
# search results rather than a human typing plain Dutch text, that gap matters.
# This is a second, independent line of defense — script.js itself no longer uses
# innerHTML with this data, so even a value that slips past this check can't
# execute; this check exists to surface obviously-wrong content to the human
# reviewer before they even see it, not to be the only thing standing between the
# internet and the page.

_HTML_LIKE = re.compile(r"[<>]")
_TEXT_FIELDS_BY_KIND = {
    "naam": "plan/insurer name",
    "bedrag": "reimbursement amount",
    "label": "link label",
}


def validate_response(data: dict) -> list[str]:
    """Scans a normalized response for content that has no business being there —
    HTML/script-like text in what should be a plain sentence, or a link that isn't
    a plain http(s) URL. Returns a list of human-readable warning strings; an empty
    list means nothing suspicious was found. Never raises — callers decide whether
    to block, warn, or ignore."""
    warnings: list[str] = []

    def check_text(insurer: str, kind: str, value: str):
        if _HTML_LIKE.search(value):
            warnings.append(
                f"{insurer}: {_TEXT_FIELDS_BY_KIND.get(kind, kind)} bevat '<' of '>' "
                f"— dit hoort platte tekst te zijn: {value!r}"
            )

    for insurer in INSURERS:
        for plan in data.get("insurers", {}).get(insurer, []):
            check_text(insurer, "naam", plan.get("naam", ""))
            bedrag = plan.get("bedrag", "")
            if bedrag != GEEN_VERGOEDING_SENTINEL:
                check_text(insurer, "bedrag", bedrag)

        for link in data.get("links", {}).get(insurer, []):
            check_text(insurer, "label", link.get("label", ""))
            url = link.get("url", "")
            parsed = urlparse(url)
            if parsed.scheme not in ("http", "https") or not parsed.netloc:
                warnings.append(
                    f"{insurer}: link-URL is geen geldige http(s)-link: {url!r}"
                )

    return warnings
