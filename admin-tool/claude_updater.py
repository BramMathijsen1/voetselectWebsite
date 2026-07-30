"""Asks Claude to research current Dutch health-insurer reimbursement amounts for
podotherapie (podiatry) and return them as structured data matching data_model.RESPONSE_SCHEMA.

Claude only ever supplies data values — the actual verzekeraars-data.js file is
generated deterministically from that data by data_model.generate_js().
"""
import datetime
import json

import anthropic

from data_model import INSURERS, RESPONSE_SCHEMA

MODEL = "claude-opus-5"


def _build_prompt(current_data: dict) -> str:
    year = datetime.date.today().year
    current_json = json.dumps(current_data, ensure_ascii=False, indent=2)
    insurer_list = ", ".join(INSURERS)
    return f"""Je bent een onderzoeksassistent voor een Nederlandse podotherapiepraktijk (VoetSelect).
Zoek via het web naar de meest actuele {year} vergoedingenoverzichten van de volgende
zorgverzekeraars voor podotherapie en podotherapeutische steunzolen: {insurer_list}.

Voor elke verzekeraar geldt: "VGZ / IZA" en "DSW / Stad Holland" zijn gecombineerde
labels voor twee gelieerde merken — zoek beide merken apart op en neem hun pakketten
samen op onder die ene sleutel, net als in de huidige data hieronder.

Dit is de huidige data die op de website staat (kan gedateerd zijn):

```json
{current_json}
```

Onderzoek per verzekeraar de actuele aanvullende-verzekeringspakketten die podotherapie
en/of podotherapeutische steunzolen vergoeden, en de bijbehorende maximale bedragen per
jaar. Gebruik de officiële vergoedingenpagina's van elke verzekeraar (zoek ernaar, gebruik
niet alleen de links uit de huidige data — die kunnen verlopen zijn).

Regels voor je antwoord:
- Geef voor elke verzekeraar de volledige, actuele lijst van pakketten die relevant zijn
  voor podotherapie, van laag naar hoog qua vergoeding. Voeg GEEN losse regel toe voor
  "alleen basisverzekering" — die wordt door de website zelf toegevoegd.
  Basisverzekering vergoedt nooit podotherapie in Nederland.
- Voor een pakket zonder vergoeding voor podotherapie: gebruik exact de tekst uit
  `geen_vergoeding_tekst` als `bedrag`.
- Voor een pakket met vergoeding: schrijf een korte, feitelijke Nederlandse zin met het
  concrete maximumbedrag, bijvoorbeeld "Max. € 200,- per jaar." of, als podotherapie en
  steunzolen apart begrensd zijn, "Max. € 100,- podotherapie + € 70,- steunzolen per jaar."
- Werk ook `links` bij: per verzekeraar de actuele officiële vergoedingenpagina('s).
- Als je voor een verzekeraar geen betrouwbare actuele informatie kunt vinden, behoud dan
  de bestaande pakketten en bedragen voor die verzekeraar ongewijzigd in plaats van te
  gokken.
- `geen_vergoeding_tekst` mag je ongewijzigd overnemen uit de huidige data.

Antwoord uitsluitend met de gestructureerde data volgens het schema — geen extra tekst."""


def fetch_updated_data(current_data: dict, api_key: str | None = None) -> dict:
    """Runs the research + structured-output request. Returns a dict matching
    data_model.RESPONSE_SCHEMA. Raises RuntimeError on refusal or on a response
    that doesn't include the expected parsed output."""
    client = anthropic.Anthropic(api_key=api_key) if api_key else anthropic.Anthropic()

    prompt = _build_prompt(current_data)

    with client.messages.stream(
        model=MODEL,
        max_tokens=32000,
        thinking={"type": "adaptive"},
        output_config={
            "effort": "high",
            "format": {"type": "json_schema", "schema": RESPONSE_SCHEMA},
        },
        tools=[
            {
                "type": "web_search_20260209",
                "name": "web_search",
                "max_uses": 30,
            }
        ],
        messages=[{"role": "user", "content": prompt}],
    ) as stream:
        response = stream.get_final_message()

    if response.stop_reason == "refusal":
        raise RuntimeError(
            "Claude heeft het verzoek geweigerd (stop_reason=refusal). "
            "Probeer het later opnieuw."
        )

    for block in response.content:
        if block.type == "text":
            try:
                return json.loads(block.text)
            except json.JSONDecodeError as exc:
                raise RuntimeError(
                    f"Kon het antwoord van Claude niet als JSON lezen: {exc}"
                ) from exc

    raise RuntimeError("Claude gaf geen tekstantwoord terug om te verwerken.")
