"""VoetSelect — Zorgverzekeringen updater.

A small desktop app: press the button, the app downloads the current
verzekeraars-data.js from the website server via FTP, Claude researches current
Dutch health-insurer reimbursement data for podotherapie via web search using that
as its baseline, you review/edit the proposed changes, and on submit the updated
verzekeraars-data.js is uploaded back to the website server via FTP.

Run directly with `python app.py`, or package as a standalone executable with
PyInstaller — see README.md.
"""
import copy
import json
import os
import sys
import threading
import tkinter as tk
from tkinter import messagebox, ttk

import data_model
import ftp_client
from claude_updater import fetch_updated_data

APP_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_PATH = os.path.join(APP_DIR, "config.json")


def load_config() -> dict:
    if not os.path.exists(CONFIG_PATH):
        raise FileNotFoundError(
            "config.json niet gevonden.\n\n"
            f"Kopieer config.example.json naar config.json in:\n{APP_DIR}\n"
            "en vul je Anthropic API key en FTP-gegevens in."
        )
    with open(CONFIG_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def resolve_path(config: dict, key: str) -> str:
    path = config[key]
    if os.path.isabs(path):
        return path
    return os.path.normpath(os.path.join(APP_DIR, path))


class ReviewWindow(tk.Toplevel):
    """Shows the proposed old->new changes per insurer, lets the user edit values —
    including adding/removing whole insurer blocks and individual pakket/link rows —
    and on submit writes + uploads the result."""

    def __init__(self, parent, config: dict, old_data: dict, new_data: dict, on_done):
        super().__init__(parent)
        self.config_data = config
        self.old_data = old_data
        self.new_data = new_data
        self.on_done = on_done

        self.title("Controleer voorgestelde wijzigingen")
        self.geometry("1180x720")
        self.minsize(900, 480)
        self.protocol("WM_DELETE_WINDOW", self._cancel)

        # Each element: {"frame", "name_var", "plans": [{"naam_var","bedrag_var","row"}],
        #                "links": [{"label_var","url_var","row"}], "plans_container", "links_container"}
        self.insurer_blocks: list[dict] = []

        self._build_ui()

    def _build_ui(self):
        header = tk.Label(
            self,
            text=(
                "Controleer de door Claude voorgestelde vergoedingen hieronder. "
                "Gewijzigde bedragen zijn geel gemarkeerd. Je kunt pakketten en "
                "verzekeraars toevoegen of verwijderen. Pas aan waar nodig en "
                "druk op 'Opslaan & uploaden' om live te zetten."
            ),
            wraplength=1120,
            justify="left",
            padx=12,
            pady=10,
        )
        header.pack(fill="x")

        container = ttk.Frame(self)
        container.pack(fill="both", expand=True)

        canvas = tk.Canvas(container, borderwidth=0)
        scrollbar = ttk.Scrollbar(container, orient="vertical", command=canvas.yview)
        scroll_frame = ttk.Frame(canvas)

        scroll_frame.bind(
            "<Configure>", lambda e: canvas.configure(scrollregion=canvas.bbox("all"))
        )
        canvas.create_window((0, 0), window=scroll_frame, anchor="nw")
        canvas.configure(yscrollcommand=scrollbar.set)

        canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")

        def _on_mousewheel(event):
            canvas.yview_scroll(int(-1 * (event.delta / 120)), "units")

        canvas.bind_all("<MouseWheel>", _on_mousewheel)

        # New insurer blocks are always packed into blocks_frame, so they render
        # above the "+ Nieuwe verzekeraar" button regardless of add order.
        self.blocks_frame = ttk.Frame(scroll_frame)
        self.blocks_frame.pack(fill="x")

        for insurer, new_plans in self.new_data["insurers"].items():
            self._add_insurer_block(
                insurer,
                old_plans=self.old_data.get("insurers", {}).get(insurer, []),
                new_plans=new_plans,
                links=self.new_data["links"].get(insurer, []),
            )

        ttk.Button(
            scroll_frame,
            text="+ Nieuwe verzekeraar toevoegen",
            command=self._add_empty_insurer_block,
        ).pack(pady=12)

        footer = ttk.Frame(self)
        footer.pack(fill="x", pady=10, padx=12)
        ttk.Button(footer, text="Annuleren", command=self._cancel).pack(
            side="right", padx=(6, 0)
        )
        ttk.Button(
            footer, text="Opslaan & uploaden naar server", command=self._submit
        ).pack(side="right")

    def _add_insurer_block(self, name: str, old_plans=None, new_plans=None, links=None) -> dict:
        old_plans = old_plans or []
        new_plans = new_plans if new_plans else [{"naam": "", "bedrag": ""}]
        links = links or []
        geen_tekst = self.new_data["geen_vergoeding_tekst"]

        frame = ttk.Frame(self.blocks_frame, relief="ridge", borderwidth=1, padding=10)
        frame.pack(fill="x", padx=12, pady=8)

        block = {
            "frame": frame,
            "name_var": tk.StringVar(value=name),
            "plans": [],
            "links": [],
        }
        self.insurer_blocks.append(block)

        header_row = ttk.Frame(frame)
        header_row.pack(fill="x")
        ttk.Label(header_row, text="Verzekeraar:", font=("", 9, "bold")).pack(side="left")
        tk.Entry(header_row, textvariable=block["name_var"], width=30, font=("", 10, "bold")).pack(
            side="left", padx=(6, 12)
        )
        ttk.Button(
            header_row,
            text="Verzekeraar verwijderen",
            command=lambda: self._remove_insurer_block(block),
        ).pack(side="right")

        cols_header = ttk.Frame(frame)
        cols_header.pack(fill="x", pady=(8, 2))
        ttk.Label(cols_header, text="Pakket", width=40, font=("", 9, "bold")).pack(side="left")
        ttk.Label(cols_header, text="Was", width=30, font=("", 9, "bold")).pack(side="left")
        ttk.Label(cols_header, text="Nieuw (bewerkbaar)", width=48, font=("", 9, "bold")).pack(
            side="left"
        )

        block["plans_container"] = ttk.Frame(frame)
        block["plans_container"].pack(fill="x")

        for i, plan in enumerate(new_plans):
            old_plan = old_plans[i] if i < len(old_plans) else None
            self._add_plan_row(block, plan.get("naam", ""), plan.get("bedrag", ""), old_plan, geen_tekst)

        ttk.Button(
            frame,
            text="+ Pakket toevoegen",
            command=lambda: self._add_plan_row(block, "", "", None, geen_tekst),
        ).pack(anchor="w", pady=(4, 10))

        ttk.Label(frame, text="Vergoedingenpagina('s):", font=("", 9, "bold")).pack(
            anchor="w", pady=(0, 2)
        )
        block["links_container"] = ttk.Frame(frame)
        block["links_container"].pack(fill="x")
        for link in links:
            self._add_link_row(block, link.get("label", ""), link.get("url", ""))

        ttk.Button(
            frame, text="+ Link toevoegen", command=lambda: self._add_link_row(block, "", "")
        ).pack(anchor="w", pady=(4, 0))

        return block

    def _add_empty_insurer_block(self):
        self._add_insurer_block("", old_plans=[], new_plans=[{"naam": "", "bedrag": ""}], links=[])

    def _remove_insurer_block(self, block: dict):
        display_name = block["name_var"].get().strip() or "(naamloos)"
        if not messagebox.askyesno(
            "Verzekeraar verwijderen",
            f"Weet je zeker dat je '{display_name}' wilt verwijderen, "
            "inclusief alle pakketten en links?",
            parent=self,
        ):
            return
        block["frame"].destroy()
        self.insurer_blocks.remove(block)

    def _add_plan_row(self, block: dict, naam: str, bedrag: str, old_plan, geen_tekst: str):
        row = ttk.Frame(block["plans_container"])
        row.pack(fill="x", pady=2)

        naam_var = tk.StringVar(value=naam)
        new_display = _display_bedrag(bedrag, geen_tekst)
        bedrag_var = tk.StringVar(value=new_display)

        tk.Entry(row, textvariable=naam_var, width=40).pack(side="left", padx=(0, 4))

        old_display = _display_bedrag(old_plan["bedrag"], geen_tekst) if old_plan else "— (nieuw pakket)"
        ttk.Label(row, text=old_display, width=30, foreground="#666666").pack(
            side="left", padx=(0, 4)
        )

        changed = old_display != new_display
        tk.Entry(
            row, textvariable=bedrag_var, width=48, bg="#fff6cc" if changed else "white"
        ).pack(side="left", padx=(0, 4))

        entry = {"naam_var": naam_var, "bedrag_var": bedrag_var, "row": row}
        ttk.Button(
            row, text="✕", width=3, command=lambda: self._remove_plan_row(block, entry)
        ).pack(side="left")

        block["plans"].append(entry)

    def _remove_plan_row(self, block: dict, entry: dict):
        if len(block["plans"]) <= 1:
            messagebox.showwarning(
                "Kan niet verwijderen",
                "Een verzekeraar moet minstens 1 pakket hebben.",
                parent=self,
            )
            return
        entry["row"].destroy()
        block["plans"].remove(entry)

    def _add_link_row(self, block: dict, label: str, url: str):
        row = ttk.Frame(block["links_container"])
        row.pack(fill="x", pady=1)

        label_var = tk.StringVar(value=label)
        url_var = tk.StringVar(value=url)

        tk.Entry(row, textvariable=label_var, width=20).pack(side="left", padx=(0, 4))
        tk.Entry(row, textvariable=url_var, width=60).pack(side="left", padx=(0, 4))

        entry = {"label_var": label_var, "url_var": url_var, "row": row}
        ttk.Button(
            row, text="✕", width=3, command=lambda: self._remove_link_row(block, entry)
        ).pack(side="left")

        block["links"].append(entry)

    def _remove_link_row(self, block: dict, entry: dict):
        entry["row"].destroy()
        block["links"].remove(entry)

    def _collect_final_data(self) -> dict:
        """Reads every insurer block's widgets into the canonical shape. Raises
        ValueError (with a message meant to be shown to the user) on anything that
        would produce broken or ambiguous data — an unnamed insurer, a duplicate
        insurer name, a pakket with only one of naam/bedrag filled in, or an
        insurer left with zero pakketten."""
        final = {
            "geen_vergoeding_tekst": self.new_data["geen_vergoeding_tekst"],
            "alleen_basisverzekering_naam": self.new_data["alleen_basisverzekering_naam"],
            "insurers": {},
            "links": {},
        }
        geen_tekst = final["geen_vergoeding_tekst"]
        seen_names = set()

        for block in self.insurer_blocks:
            insurer_name = block["name_var"].get().strip()
            if not insurer_name:
                raise ValueError("Elke verzekeraar moet een naam hebben.")
            if insurer_name in seen_names:
                raise ValueError(
                    f"Verzekeraarsnaam '{insurer_name}' komt meerdere keren voor. "
                    "Gebruik unieke namen."
                )
            seen_names.add(insurer_name)

            plans = []
            for entry in block["plans"]:
                naam = entry["naam_var"].get().strip()
                bedrag = entry["bedrag_var"].get().strip()
                if not naam and not bedrag:
                    continue  # blank leftover row — skip silently
                if not naam or not bedrag:
                    raise ValueError(
                        f"'{insurer_name}': vul zowel de pakketnaam als het bedrag in "
                        "(of maak de regel helemaal leeg om 'm te laten vervallen)."
                    )
                if bedrag == geen_tekst:
                    bedrag = data_model.GEEN_VERGOEDING_SENTINEL
                plans.append({"naam": naam, "bedrag": bedrag})

            if not plans:
                raise ValueError(f"'{insurer_name}': voeg minstens 1 pakket toe.")

            final["insurers"][insurer_name] = plans

            links = []
            for entry in block["links"]:
                label = entry["label_var"].get().strip()
                url = entry["url_var"].get().strip()
                if label and url:
                    links.append({"label": label, "url": url})
            final["links"][insurer_name] = links

        if not final["insurers"]:
            raise ValueError("Er moet minstens 1 verzekeraar overblijven.")

        return final

    def _submit(self):
        try:
            final_data = self._collect_final_data()
        except ValueError as exc:
            messagebox.showerror("Controleer de gegevens", str(exc), parent=self)
            return
        if self.config_data.get("test_mode"):
            try:
                test_path = resolve_path(self.config_data, "test_data_path")
                data_model.save_json_data(test_path, final_data)
            except Exception as exc:
                messagebox.showerror(
                    "Opslaan mislukt",
                    f"Kon {test_path} niet opslaan:\n{exc}",
                    parent=self,
                )
                return
            messagebox.showinfo(
                "Klaar (testmodus)",
                f"Testmodus: de wijzigingen zijn opgeslagen in:\n{test_path}\n\n"
                "Er is niets geüpload naar een server.",
                parent=self,
            )
            self.destroy()
            self.on_done()
            return

        js_content = data_model.generate_js(final_data)
        try:
            ftp_client.upload_file(js_content, self.config_data)
        except Exception as exc:
            messagebox.showerror(
                "Upload mislukt",
                f"De upload naar de server is mislukt:\n{exc}",
                parent=self,
            )
            return

        messagebox.showinfo(
            "Klaar",
            "De vergoedingengegevens zijn naar de website geüpload.",
            parent=self,
        )
        self.destroy()
        self.on_done()

    def _cancel(self):
        self.destroy()
        self.on_done()


def _display_bedrag(bedrag: str, geen_tekst: str) -> str:
    if bedrag == data_model.GEEN_VERGOEDING_SENTINEL:
        return geen_tekst
    return bedrag


class MainWindow(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("VoetSelect — Zorgverzekeringen updater")
        self.geometry("520x260")
        self.resizable(False, False)

        tk.Label(
            self,
            text="Zorgverzekeringen updaten",
            font=("", 14, "bold"),
        ).pack(pady=(24, 6))
        tk.Label(
            self,
            text=(
                "Claude zoekt de actuele vergoedingen voor podotherapie op bij elke\n"
                "zorgverzekeraar en stelt een update voor verzekeraars-data.js voor.\n"
                "Je controleert en bevestigt de wijzigingen voordat ze live gaan."
            ),
            justify="center",
        ).pack(pady=(0, 20))

        self.use_claude_var = tk.BooleanVar(value=True)
        ttk.Checkbutton(
            self,
            text="Gebruik Claude om nieuwe gegevens te genereren (webonderzoek)",
            variable=self.use_claude_var,
        ).pack(pady=(0, 10))

        self.update_button = ttk.Button(
            self, text="Zorgverzekeringen updaten", command=self._on_click
        )
        self.update_button.pack(pady=4)

        self.status_var = tk.StringVar(value="")
        tk.Label(self, textvariable=self.status_var, fg="#555555").pack(pady=(14, 0))

    def _on_click(self):
        try:
            config = load_config()
        except FileNotFoundError as exc:
            messagebox.showerror("Configuratie ontbreekt", str(exc))
            return

        use_claude = self.use_claude_var.get()
        self.update_button.config(state="disabled")
        self.status_var.set(
            "Bezig met onderzoek via Claude... dit kan enkele minuten duren."
            if use_claude
            else "Gegevens ophalen..."
        )

        thread = threading.Thread(
            target=self._run_update, args=(config, use_claude), daemon=True
        )
        thread.start()

    def _run_update(self, config: dict, use_claude: bool):
        try:
            if config.get("test_mode"):
                # Testmodus: geen FTP nodig — de app leest/schrijft uitsluitend deze
                # lokale file, die de rol van "de website" speelt.
                test_path = resolve_path(config, "test_data_path")
                old_data = data_model.load_json_data(test_path)
            else:
                js_text = ftp_client.download_file(config)
                old_data = data_model.parse_js(js_text)

            if use_claude:
                api_key = config.get("anthropic_api_key") or None
                raw_result = fetch_updated_data(old_data, api_key=api_key)
                new_data = data_model.normalize_model_response(raw_result)
            else:
                # Geen onderzoek — de reviewer bewerkt de huidige gegevens direct.
                new_data = copy.deepcopy(old_data)
                new_data.setdefault(
                    "alleen_basisverzekering_naam",
                    "Ik heb alleen een basisverzekering (geen aanvullende verzekering)",
                )

            warnings = data_model.validate_response(new_data)
        except Exception as exc:
            self.after(0, self._on_update_error, exc)
            return
        self.after(0, self._on_update_success, config, old_data, new_data, warnings)

    def _on_update_success(
        self, config: dict, old_data: dict, new_data: dict, warnings: list
    ):
        self.status_var.set("")
        self.update_button.config(state="normal")

        if warnings:
            proceed = messagebox.askyesno(
                "Verdachte inhoud gevonden",
                "De gegevens bevatten tekst die niet als platte tekst vertrouwd "
                "kan worden (bijv. '<' of '>', of een link die geen gewone "
                "http(s)-link is):\n\n"
                + "\n".join(f"• {w}" for w in warnings)
                + "\n\nControleer deze velden extra goed in het volgende scherm. "
                "Wil je toch doorgaan?",
                icon="warning",
            )
            if not proceed:
                return

        ReviewWindow(self, config, old_data, new_data, on_done=self.destroy)

    def _on_update_error(self, exc: Exception):
        self.status_var.set("")
        self.update_button.config(state="normal")
        messagebox.showerror("Bijwerken mislukt", str(exc))


if __name__ == "__main__":
    app = MainWindow()
    app.mainloop()
