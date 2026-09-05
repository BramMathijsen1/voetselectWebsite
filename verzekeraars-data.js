/* VoetSelect: vergoedingengegevens voor de "Check uw vergoeding" modal.
   Indicatieve bedragen voor 2026, o.b.v. de vergoedingenoverzichten van
   de verzekeraars zelf. Wijzigt jaarlijks, check bij twijfel de eigen
   polisvoorwaarden of het overzicht op podotherapie.nl/vergoedingen. */

const GEEN_VERGOEDING = 'Geen vergoeding voor podotherapie of steunzolen vanuit dit pakket.';
const ALLEEN_BASISVERZEKERING = { naam: 'Ik heb alleen een basisverzekering (geen aanvullende verzekering)', bedrag: GEEN_VERGOEDING };

const VERGOEDING_PLANS = {
  'Zilveren Kruis': [
    ALLEEN_BASISVERZEKERING,
    { naam: 'Aanvullend 1 of 2 Sterren', bedrag: GEEN_VERGOEDING },
    { naam: 'Aanvullend 3 Sterren', bedrag: 'Max. € 150,- per kalenderjaar (incl. maximaal 1 paar steunzolen).' },
    { naam: 'Aanvullend 4 Sterren', bedrag: 'Max. € 200,- per kalenderjaar (incl. maximaal 1 paar steunzolen).' },
  ],
  'CZ': [
    ALLEEN_BASISVERZEKERING,
    { naam: 'CZ Basis / Start', bedrag: GEEN_VERGOEDING },
    { naam: 'CZ Jongeren', bedrag: 'Max. € 70,- podotherapie + € 60,- steunzolen per jaar.' },
    { naam: 'CZ 50+', bedrag: 'Max. € 115,- podotherapie + € 60,- steunzolen per jaar.' },
    { naam: 'CZ Plus of Top', bedrag: 'Max. € 115,- podotherapie + € 75,- steunzolen per jaar.' },
  ],
  'VGZ / IZA': [
    ALLEEN_BASISVERZEKERING,
    { naam: 'VGZ Instap / Primair / Aanvullend Instap', bedrag: GEEN_VERGOEDING },
    { naam: 'VGZ Goed / Werkt Goed / Zorgt Goed / Aanvullend Goed', bedrag: 'Max. € 100,- podotherapie + € 70,- steunzolen per jaar.' },
    { naam: 'VGZ Beter / Werkt Beter / Zorgt Beter / Aanvullend Beter', bedrag: 'Max. € 300,- podotherapie + € 125,- steunzolen per jaar.' },
    { naam: 'VGZ Best / Werkt Best / Zorgt Best / Aanvullend Best', bedrag: 'Max. € 500,- podotherapie + € 125,- tot € 180,- steunzolen per jaar.' },
    { naam: 'IZA Extra Zorg 1', bedrag: 'Max. € 100,- per jaar (steunzolen apart budget van € 125,-).' },
    { naam: 'IZA Extra Zorg 2', bedrag: 'Max. € 200,- per jaar (steunzolen apart budget van € 125,-).' },
    { naam: 'IZA Extra Zorg 3', bedrag: 'Max. € 300,- per jaar (steunzolen apart budget van € 225,-).' },
  ],
  'Menzis': [
    ALLEEN_BASISVERZEKERING,
    { naam: 'Aanvullend / Extra Aanvullend / JongerenVerzorgd / ExtraVerzorgd 1', bedrag: GEEN_VERGOEDING },
    { naam: 'GarantVerzorgd 1', bedrag: 'Max. € 50,- per jaar.' },
    { naam: 'Collectief Aanvullend 2', bedrag: 'Max. € 100,- per jaar.' },
    { naam: 'ExtraVerzorgd 2 of Collectief Aanvullend 3', bedrag: 'Max. € 150,- per jaar.' },
    { naam: 'GarantVerzorgd 2 of Collectief Aanvullend 4', bedrag: 'Max. € 200,- per jaar.' },
    { naam: 'ExtraVerzorgd 3 of GarantVerzorgd 3', bedrag: 'Max. € 250,- per jaar.' },
  ],
  'DSW / Stad Holland': [
    ALLEEN_BASISVERZEKERING,
    { naam: 'AV Compact (DSW) / Compact AV (Stad Holland)', bedrag: 'Max. € 27,50 per behandeling, tot 6 behandelingen per jaar.' },
    { naam: 'AV Student (DSW) / Jongeren AV (Stad Holland)', bedrag: 'Podotherapie en steunzolen samen max. € 100,- per jaar.' },
    { naam: 'AV Standaard (DSW) / Standaard AV (Stad Holland)', bedrag: 'Podotherapie en steunzolen samen max. € 125,- per jaar.' },
    { naam: 'AV Top (DSW) / Uitgebreide of Extra Uitgebreide AV (Stad Holland)', bedrag: 'Podotherapie en steunzolen samen max. € 150,- per jaar.' },
  ],
  'ONVZ': [
    ALLEEN_BASISVERZEKERING,
    { naam: 'Startfit / Benfit / Bewuste Keuze Start of Extra', bedrag: GEEN_VERGOEDING },
    { naam: 'Optifit', bedrag: 'Max. € 200,- per jaar voor podotherapie en steunzolen samen.' },
    { naam: 'Topfit', bedrag: 'Max. € 500,- per jaar voor podotherapie en steunzolen samen.' },
    { naam: 'Superfit', bedrag: '100% vergoed (steunzolen tot max. € 500,- per jaar).' },
  ],
  'De Friesland': [
    ALLEEN_BASISVERZEKERING,
    { naam: 'AV Instap / AV Budget / AV Standaard', bedrag: GEEN_VERGOEDING },
    { naam: 'AV Extra', bedrag: 'Max. € 150,- per kalenderjaar.' },
    { naam: 'AV Optimaal of Frieso Compleet', bedrag: 'Max. € 250,- per kalenderjaar.' },
  ],
};

/* Officiële vergoedingenpagina's, gebruikt in het resultaat als iemand
   zijn/haar pakket niet weet. */
const INSURER_LINKS = {
  'Zilveren Kruis': [{ label: 'zilverenkruis.nl', url: 'https://www.zilverenkruis.nl/consumenten/vergoedingen/podoposturaaltherapie-podologie-en-steunzolen' }],
  'CZ': [{ label: 'cz.nl', url: 'https://www.cz.nl/vergoedingen/voetzorg' }],
  'VGZ / IZA': [
    { label: 'vgz.nl', url: 'https://www.vgz.nl/vergoedingen/podotherapie' },
    { label: 'iza.nl', url: 'https://www.iza.nl/vergoedingen' },
  ],
  'Menzis': [{ label: 'menzis.nl', url: 'https://www.menzis.nl/zorg-en-vergoedingen/p/podotherapie' }],
  'DSW / Stad Holland': [
    { label: 'dsw.nl', url: 'https://www.dsw.nl/consumenten/vergoedingen/steunzolen-en-podotherapie' },
    { label: 'stadholland.nl', url: 'https://www.stadholland.nl/consumenten/vergoedingen/steunzolen-en-podotherapie' },
  ],
  'ONVZ': [{ label: 'onvz.nl', url: 'https://www.onvz.nl/vergoedingen/vergoedingen-a-z/podotherapie-en-podologie' }],
  'De Friesland': [{ label: 'defriesland.nl', url: 'https://www.defriesland.nl/vergoedingen/podoposturaaltherapie-en-podologie' }],
};
