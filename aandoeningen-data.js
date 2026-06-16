/* VoetSelect — ailment data used by aandoeningen.html and aandoening.html */
const AANDOENINGEN = [
  {
    id: 'polyneuropathie',
    naam: '(Poly)neuropathie',
    excerpt: 'Een beschadiging of aandoening aan een zenuw wordt neuropathie genoemd. Wanneer er meerdere zenuwen aangedaan zijn wordt dit polyneuropathie genoemd.',
    body: [
      'Een beschadiging of aandoening aan een zenuw wordt neuropathie genoemd. Wanneer er meerdere zenuwen aangedaan zijn wordt dit polyneuropathie genoemd. Klachten variëren van tintelingen, brandend gevoel en gevoelsstoornissen tot pijn en krachtsverlies, met name in de voeten en onderbenen. De klachten kunnen \'s nachts verergeren en het dagelijks functioneren flink beïnvloeden.',
      'Bij VoetSelect Podotherapie onderzoeken we uw looppatroon en de stand van uw voeten en benen. Drukverdelende zolen en passend schoeisel kunnen de druk op aangedane zenuwen verminderen en zo bijdragen aan klachtenverlichting. Wij werken indien nodig ook samen met andere zorgverleners voor een optimaal resultaat.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'aandoeningen-van-de-lies',
    naam: 'Aandoeningen van de lies',
    excerpt: 'Liesblessures zijn veel voorkomend binnen verschillende takken van sport. Vaak ligt de oorzaak in een verkeerd bewegingspatroon waardoor chronische overbelasting van de spieren in de lies ontstaat.',
    body: [
      'Liesblessures zijn veel voorkomend, zowel bij sporters als bij niet-sporters. Vaak ligt de oorzaak in een verkeerd bewegingspatroon waardoor chronische overbelasting van de spieren en pezen in de liesstreek ontstaat. Klachten uiten zich als pijn bij bewegen, strekken of optillen van het been.',
      'Een podotherapeut analyseert uw looppatroon en de stand van uw benen en bekken. Door de belasting via inlegzolen en looptraining te corrigeren, kan de overbelasting op de liesstreek aanzienlijk worden verminderd.'
    ],
    gebied: 'been', kleur: 'blue'
  },
  {
    id: 'achillespeesklachten',
    naam: 'Achillespeesklachten',
    excerpt: 'Pijnklachten aan de achillespees kunnen verschillende oorzaken hebben. De achillespees wordt sterk beïnvloed door de stand van de voet, de groei van uw kind en het looppatroon.',
    body: [
      'Pijnklachten aan de achillespees kunnen verschillende oorzaken hebben. De achillespees verbindt de kuitspieren met het hielbeen en is cruciaal bij lopen, springen en staan op de tenen. De stand van de voet, het looppatroon en bij kinderen ook groeispurten beïnvloeden de belasting op de pees sterk.',
      'Bij VoetSelect onderzoeken we de voetstand, de spierspanning in de kuiten en het looppatroon. Orthopedische zolen met een lichte hielverhoging, gecombineerd met schoenadvies, kunnen de belasting op de achillespees aanzienlijk verminderen.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'achillodynie',
    naam: 'Achillodynie',
    excerpt: 'Veelvuldige, verkeerde belasting van de achillespees kan leiden tot (kleine) beschadiging van deze pees. Pezen zijn nauwelijks voorzien van bloedvaten en genezen daardoor vaak erg langzaam.',
    body: [
      'Veelvuldige of verkeerde belasting van de achillespees kan leiden tot microscheutjes in de peesstructuur. Pezen zijn nauwelijks voorzien van bloedvaten en genezen daardoor traag. Achillodynie kenmerkt zich door pijn en soms zwelling aan de achillespees, met name bij de eerste stappen in de ochtend of na rust.',
      'Podotherapeutische behandeling richt zich op het corrigeren van de voetstand en het ontlasten van de pees via zolen met hielverhoging. Aanvullend geven we advies over schoeisel, trainingsopbouw en rekoefeningen om herstel te bevorderen.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'afwijkende-stand-benen',
    naam: 'Afwijkende stand van de benen',
    excerpt: 'Peuters en kleuters maken een enorme ontwikkeling door. Een O-stand en een X-stand worden veel gezien. De O-stand is normaal voor kinderen tot 1 jaar.',
    body: [
      'Peuters en kleuters maken een enorme ontwikkeling door, ook in de stand van hun benen. Een O-stand (genu varum) en een X-stand (genu valgum) zijn tot op zekere leeftijd volkomen normaal. Wanneer de beenstand buiten de normale grenzen valt of bij volwassenen klachten geeft, is nader onderzoek gewenst.',
      'Een podotherapeut beoordeelt de beenstand en het looppatroon. Door inlegzolen, schoenadvies en eventuele oefentherapie kan de stand positief worden beïnvloed en kunnen klachten worden voorkomen of verminderd.'
    ],
    gebied: 'been', kleur: 'blue'
  },
  {
    id: 'afwijkende-stand-tenen',
    naam: 'Afwijkende stand van de tenen',
    excerpt: 'De stand van de tenen wordt beïnvloed door spierspanning, het looppatroon en de stand van gewrichten. Wanneer hier een disbalans in ontstaat, kunnen tenen een afwijkende stand ontwikkelen.',
    body: [
      'De stand van de tenen wordt beïnvloed door spierspanning, het looppatroon en de stand van de gewrichten. Wanneer hierin een disbalans ontstaat, kunnen de tenen klauw- of hamertenen gaan vormen. Dit leidt tot druk- en wrijvingsproblemen in het schoeisel en daarmee tot pijn en likdoorns.',
      'Bij VoetSelect analyseren we de teenstanden en het looppatroon. Teenspreiders, siliconen teenorthosen en aangepaste zolen kunnen de stand verbeteren en de druk verlichten. We adviseren ook over passend schoeisel.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'anterior-tibiotalair',
    naam: 'Anterior tibiotalair compressiesyndroom',
    excerpt: 'Herhaaldelijke flexie van de enkel geeft compressie in het gewricht waardoor pijnklachten ontstaan. Sporters die veelvuldig springen en landen of hurken lopen een vergroot risico.',
    body: [
      'Bij het anterior tibiotalair compressiesyndroom veroorzaakt herhaaldelijke flexie (naar voren buigen) van de enkel compressie van de weke delen aan de voorzijde van het gewricht. Dit geeft pijn aan de voorzijde van de enkel bij springen, landen, hurken of traplopen. Sporters zoals voetballers, dansers en turners zijn vaker getroffen.',
      'Een podotherapeut onderzoekt de beweeglijkheid van het enkelgewricht en het looppatroon. Inlegzolen die de voetstand corrigeren verminderen de compressie aan de voorzijde van de enkel en verlichten de klachten.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'artrose',
    naam: 'Artrose',
    excerpt: 'Bij artrose van de heup kunnen forse pijnklachten ontstaan. Artrose is slijtage van het kraakbeen in het gewricht. Pijnklachten zijn wisselend per persoon.',
    body: [
      'Artrose is slijtage van het kraakbeen in een gewricht. Bij artrose van de heup (coxartrose) kunnen forse pijnklachten optreden, met name in de lies, het zitvlak of de binnenzijde van het bovenbeen. De klachten zijn wisselend: sommige patiënten ervaren nauwelijks hinder, anderen dagelijkse pijn en stijfheid.',
      'Een podotherapeut beoordeelt of het looppatroon bijdraagt aan de overbelasting van het heupgewricht. Inlegzolen die de belasting herverdelen en schoenadvies kunnen de pijn bij het lopen verminderen en de mobiliteit verbeteren.'
    ],
    gebied: 'heup', kleur: 'gold'
  },
  {
    id: 'artrose-bsg',
    naam: 'Artrose BSG',
    excerpt: 'Bij artrose van het bovenste spronggewricht (de enkel) kunnen forse pijnklachten ontstaan. Artrose is slijtage van het kraakbeen in het gewricht.',
    body: [
      'Artrose van het bovenste spronggewricht (BSG), de enkel, is slijtage van het kraakbeen in de enkel. Dit veroorzaakt pijn bij staan, lopen en traplopen. De enkel kan ook gezwollen en stijf zijn, met name na rust of \'s ochtends.',
      'Een podotherapeut analyseert het looppatroon en de voet- en enkelstand. Orthopedische zolen verminderen de belasting op de slijtage-plek, waardoor pijn bij het lopen afneemt en de mobiliteit langer behouden blijft.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'artrose-mtp1',
    naam: 'Artrose MTP-1 gewricht',
    excerpt: 'Bij artrose van het gewricht van de grote teen kunnen scherpe pijnklachten ontstaan. Met name het afwikkelen van de voet is pijnlijk.',
    body: [
      'Artrose van het eerste metatarsofalangeale gewricht (MTP-1) is slijtage van het kraakbeen in het gewricht van de grote teen. Het afwikkelen van de voet bij het lopen is pijnlijk. In een vergevorderd stadium kan de beweeglijkheid van de teen sterk beperkt zijn (hallux rigidus).',
      'Bij VoetSelect wordt de beweeglijkheid en belasting van het gewricht onderzocht. Speciale zolen die de afwikkeling begeleiden en de grote teen ontzien verminderen de pijn aanzienlijk. Schoenadvies maakt deel uit van de behandeling.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'atrofisch-plantair-capiton',
    naam: 'Atrofisch plantair capiton',
    excerpt: 'Onder de voorvoet bevindt zich een onderhuids vetkussen dat de gewrichten beschermt. Naarmate men ouder wordt kan dit vetkussen dunner worden.',
    body: [
      'Onder de voorvoet bevindt zich een onderhuids vetkussen dat de middenvoetsbeentjes en gewrichten beschermt bij staan en lopen. Naarmate men ouder wordt, of bij intensieve belasting, wordt dit vetkussen dunner en neemt de beschermende functie af. Dit leidt tot pijnlijke eeltvorming en drukplekken onder de voorvoet.',
      'Een podotherapeut past schokdempende zolen aan die het vetkussen nabootsen en compenseren. Hiermee wordt de druk onder de voorvoet herverdeeld en worden de pijnklachten sterk verminderd.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'beenlengteverschil',
    naam: 'Beenlengteverschil',
    excerpt: 'Een verschil in beenlengte kan scheefstand in het bekken en de rug tot gevolg hebben. Tijdens groeiperioden is het normaal dat beide benen ongelijk groeien.',
    body: [
      'Een verschil in beenlengte kan een scheefstand in het bekken en de rug veroorzaken. Dit gaat niet altijd gepaard met pijnklachten, maar kan op lange termijn leiden tot overbelasting van heup, knie, rug of voet. Tijdens groeiperioden is een tijdelijk verschil normaal en lost dit zich vaak vanzelf op.',
      'Bij VoetSelect meten we het beenlengteverschil nauwkeurig en beoordelen we de effecten op het looppatroon. Via een hakverhoging in het schoeisel of een compenserende inlegzool wordt het verschil gecorrigeerd en worden klachten verlicht of voorkomen.'
    ],
    gebied: 'been', kleur: 'blue'
  },
  {
    id: 'bruised-heel',
    naam: 'Bruised Heel',
    excerpt: 'Letterlijk betekent dit "gekneusde hiel". Eigenlijk is het hielbeen zelf niet aangedaan, maar het vetkussensysteem dat zich daaronder bevindt.',
    body: [
      'Bij een bruised heel is niet het hielbeen aangedaan, maar het complexe vetkussensysteem eronder. Door een harde klap of stoot op de hiel, of door langdurige overbelasting, kunnen de vetkamertjes beschadigen en hun veerkracht verliezen. Dit veroorzaakt een scherpe, stekende pijn bij het belasten van de hiel.',
      'Een podotherapeut past schokdempende hielcups of inlegzolen aan die de druk opvangen en over de hiel verdelen. In combinatie met schoenadvies kan de hiel worden ontlast terwijl herstel plaatsvindt.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'bursitis-subtrochanterica',
    naam: 'Bursitis subtrochanterica',
    excerpt: 'Hierbij is de slijmbeurs in de heup ontstoken. Oorzaken kunnen zijn een acute beschadiging, overbelasting of het verkeerd functioneren van de omliggende spieren.',
    body: [
      'Bij bursitis subtrochanterica is een slijmbeurs (bursa) aan de buitenzijde van de heup ontstoken. Oorzaken zijn een acute beschadiging, chronische overbelasting of het verkeerd functioneren van de omliggende heupspieren. Klachten bestaan uit een scherpe of brandende pijn aan de buitenzijde van de heup, soms uitstralend naar het bovenbeen.',
      'Een podotherapeut onderzoekt of een afwijkend looppatroon of beenlengteverschil bijdraagt aan de overbelasting van de slijmbeurs. Correctie via inlegzolen en schoenadvies kan de druk op de slijmbeurs verminderen.'
    ],
    gebied: 'heup', kleur: 'gold'
  },
  {
    id: 'compressie-neuropathie',
    naam: 'Compressie neuropathie',
    excerpt: 'Bij klachten als gevolg van een zenuwinklemming spreken we van compressie neuropathie. Symptomen kunnen zijn een dof, tintelend gevoel, scherpe pijnscheuten of spieruitval.',
    body: [
      'Bij compressie neuropathie is een zenuw ingeklemd, waardoor klachten ontstaan in het innervatiege bied van die zenuw. Symptomen zijn een dof of tintelend gevoel, brandende pijn, scherpe pijnscheuten of in ernstige gevallen spieruitval. Veelvoorkomende locaties zijn de voet (tarsale tunnel, Morton), het been of de enkel.',
      'Een podotherapeut lokaliseert de inklemming en beoordeelt of een afwijkende voetstand of looppatroon de zenuw onder druk zet. Door de voetstand te corrigeren met inlegzolen en het schoeisel aan te passen kan de druk op de zenuw worden verminderd.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'coup-de-fouet',
    naam: 'Coup de Fouet',
    excerpt: 'Deze aandoening is beter bekend als "zweepslag". Zweepslag is een scheur in de kuitspier die ontstaat bij plotselinge rek door een verkeerde beweging.',
    body: [
      'Coup de Fouet, de zweepslag, is een (gedeeltelijke) scheur in de kuitspier door een plotselinge, te sterke rek. Dit gebeurt vaak bij een explosieve beweging zoals wegsprinten of van richting veranderen. De klacht kenmerkt zich door een plotselinge hevige pijn in de kuit, alsof iemand u heeft geslagen.',
      'Na de acute fase beoordeelt een podotherapeut of aanpassing van het schoeisel of inlegzolen met hielverhoging het herstel ondersteunen en herhaling helpen voorkomen. Loopanalyse geeft inzicht in of het looppatroon heeft bijgedragen aan de blessure.'
    ],
    gebied: 'been', kleur: 'blue'
  },
  {
    id: 'fasciitis-plantaris',
    naam: 'Fasciitis plantaris',
    excerpt: 'Onder de voet bevindt zich een peesplaat. Bij teveel of verkeerde belasting kan deze peesplaat gaan irriteren of zelfs ontsteken.',
    body: [
      'Onder de voet bevindt zich de fascia plantaris, een stevige peesplaat die loopt van het hielbeen naar de teengewrichten. Bij teveel of verkeerde belasting kan deze peesplaat gaan irriteren of ontsteken, wat leidt tot pijn aan de onderzijde van de hiel, met name bij de eerste stappen \'s ochtends of na langdurige rust.',
      'Bij VoetSelect onderzoeken we de voetstand, het looppatroon en de spanning in de peesplaat. Orthopedische inlegzolen die de peesplaat ondersteunen en ontlasten zijn de meest effectieve behandeling, aangevuld met schoenadvies en rekoefeningen.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'fatpad-syndroom',
    naam: 'Fatpad syndroom',
    excerpt: 'Onder de hiel bevinden zich verschillende vetkussentjes ter bescherming van het hielbeen. Dit vetkamersysteem kan gaan slijten waardoor vetkussentjes gaan lekken.',
    body: [
      'Onder de hiel bevinden zich meerdere vetkamertjes die het hielbeen beschermen bij lopen en staan. Dit complexe systeem kan door slijtage of beschadiging zijn veerkracht verliezen, waardoor vetkussentjes "lekken" en de beschermende functie afneemt. Het resultaat is een diepgelegen, stekende pijn bij het belasten van de hiel.',
      'Bij VoetSelect worden schokdempende hielcups of maatwerkzolen aangemeten om de druk op de hiel op te vangen en te verdelen. Dit geeft verlichting van de klachten terwijl het weefsel kans krijgt te herstellen.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'fractuur-os-sesamodeum',
    naam: 'Fractuur os sesamodeum',
    excerpt: 'Door teveel belasting op de grote teen kan een fractuur ontstaan aan het os sesamoïdeum, een klein botfragment verweven in een pees onder het gewricht van de grote teen.',
    body: [
      'Het os sesamoïdeum is een klein bot verweven in de pees onder het gewricht van de grote teen. Door overmatige belasting op de voorvoet, bij sporten of intensief lopen, kan dit botje scheuren of breken. De klacht uit zich als scherpe pijn onder de grote teen, met name bij het afstoten.',
      'Een podotherapeut ontlast het sesamoïd door de afwikkeling via de grote teen te verminderen met speciale inlegzolen. Schoenadvies maakt deel uit van de behandeling en helpt pijn te verlichten terwijl het bot geneest.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'genua-valga-vara',
    naam: 'Genua valga/vara',
    excerpt: 'Deze term geeft aan dat de knieën in een X- of O-stand staan. Dit kan pijnklachten geven vanwege de overmatige trekkracht of verwringing in de knieën.',
    body: [
      'Genua valga (X-benen) en genua vara (O-benen) zijn aanduidingen voor een afwijkende stand van de knieën. Dit kan pijnklachten veroorzaken tijdens staan en lopen vanwege overmatige trekkracht of verwringing in de kniegewrichten. Op langere termijn kan het leiden tot versnelde slijtage van de knie.',
      'Een podotherapeut onderzoekt knieën, heupen en voeten in samenhang. Door de voetstand te corrigeren met inlegzolen kan de belasting op de knieën worden herverdeeld, waardoor klachten verminderen en slijtage vertraagt.'
    ],
    gebied: 'knie', kleur: 'terra'
  },
  {
    id: 'gonartrose',
    naam: 'Gonartrose',
    excerpt: 'Bij artrose van de knie kunnen forse pijnklachten ontstaan. Artrose is slijtage van het kraakbeen in het gewricht. Pijnklachten zijn wisselend per persoon.',
    body: [
      'Gonartrose is artrose van de knie: slijtage van het kraakbeen in het kniegewricht. Klachten bestaan uit pijn, stijfheid en soms zwelling van de knie, met name bij starten na rust, traplopen en langdurig lopen. Gonartrose treft vaak de binnenzijde (mediaal) of buitenzijde (lateraal) van de knie.',
      'Een podotherapeut analyseert het looppatroon en de belasting op het kniegewricht. Inlegzolen die de voetstand en kniebelasting corrigeren verminderen de druk op het aangedane kraakbeen en dragen bij aan pijnverlichting en behoud van mobiliteit.'
    ],
    gebied: 'knie', kleur: 'terra'
  },
  {
    id: 'haglundse-exostose',
    naam: 'Haglundse exostose',
    excerpt: 'Er is sprake van een verdikking van het bot aan de achterzijde van het hielbeen. Door verkeerde schoenen of een afwijkende voetstand ontstaat extra druk op het hielbeen.',
    body: [
      'Bij de Haglundse exostose is er een benige verdikking aan de achterzijde van het hielbeen. Door druk van het schoeisel of een naar binnen of buiten gekantelde voetstand ontstaat wrijving op deze verdikking, wat leidt tot een pijnlijke en soms gezwollen achterhiel. De slijmbeurs ter plaatse is ook vaak geïrriteerd.',
      'Een podotherapeut onderzoekt de voetstand en het schoeisel. Inlegzolen die de hiel licht verhogen en de voetstand corrigeren, gecombineerd met schoenadvies (vermijd rigide hielkap), verminderen de druk op de exostose sterk.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'hallux-abductovalgus',
    naam: 'Hallux abductovalgus',
    excerpt: 'Deze aandoening betreft een scheefstand van de grote teen (HAV). Met name vrouwen ontwikkelen deze aandoening, ook wel "bunion" of "knobbel" genoemd.',
    body: [
      'Hallux abductovalgus (HAV), ook wel bunion of knobbel, is een afwijkende scheefstand van de grote teen waarbij het eerste middenvoetsbeentje naar binnen kantelt. Dit leidt tot een uitstekende knobbel aan de binnenzijde van de voet. Met name vrouwen zijn getroffen, mede door smal of hoog schoeisel.',
      'Bij VoetSelect beoordelen we de ernst van de stand en het looppatroon. Inlegzolen die de voetboog ondersteunen en de belasting op het grote teengewricht verminderen remmen de progressie af en verlichten pijnklachten. Schoenadvies is een essentieel onderdeel van de behandeling.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'hernia-nuclei-pulposi',
    naam: 'Hernia nuclei pulposi',
    excerpt: 'Deze aandoening is bekend als "hernia". Een tussenwervelschijf stulpt uit en geeft druk op het ruggenmerg of een zenuwwortel, met pijn en uitstralende klachten als gevolg.',
    body: [
      'Bij een hernia nuclei pulposi (HNP) stulpt de kern van een tussenwervelschijf uit en drukt op een zenuwwortel. Dit veroorzaakt rugpijn en/of uitstralende pijn in het been (ischias), tintelingen, gevoelsstoornissen of krachtsverlies in het been of de voet. De lumbale wervelkolom is het meest aangedaan.',
      'Een podotherapeut beoordeelt of een beenlengteverschil of afwijkend looppatroon bijdraagt aan de belasting van de wervelkolom. Het egaliseren van de belasting via inlegzolen kan de druk op de aangedane schijf verminderen als aanvulling op de reguliere behandeling.'
    ],
    gebied: 'wervelkolom', kleur: 'sage'
  },
  {
    id: 'hielspoor',
    naam: 'Hielspoor',
    excerpt: 'Hielspoor wordt vaak verward met fasciitis plantaris. Bij hielspoor is op een röntgenfoto een uitsteeksel van het hielbeen zichtbaar dat pijnklachten kan veroorzaken.',
    body: [
      'Hielspoor is een benig uitsteeksel aan de onderzijde of achterzijde van het hielbeen, zichtbaar op röntgenfoto. Het wordt vaak verward met fasciitis plantaris. Een hielspoor kán pijn veroorzaken, maar hoeft dat niet. De pijn is meestal het sterkst bij de eerste stappen na rust of \'s ochtends bij het opstaan.',
      'Bij VoetSelect onderzoeken we de voetstand, de peesplaat en het looppatroon. Orthopedische inlegzolen die de hiel ondersteunen en de peesplaat ontlasten zijn de eerste behandelstap. Schoenadvies maakt deel uit van het totale behandelplan.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'hypermobiliteit',
    naam: 'Hypermobiliteit',
    excerpt: 'Hypermobiliteit houdt in dat er teveel beweging in de gewrichten mogelijk is door erg soepele banden en pezen, wat kan leiden tot klachten aan gewrichten en spieren.',
    body: [
      'Hypermobiliteit betekent dat de gewrichten meer beweeglijkheid hebben dan normaal door erg soepele banden en pezen. Dit kan leiden tot gewrichtspijn, vermoeidheid, terugkerende verstuikingen en instabiliteit van voeten, enkels en knieën. Hypermobiliteit komt vaker voor bij vrouwen en kinderen.',
      'Een podotherapeut onderzoekt de mate van hypermobiliteit in de voeten en enkels. Stabiliserende inlegzolen en schoenadvies met voldoende steun ondersteunen de gewrichten en verminderen klachten. Gerichte spierkrachtoefeningen zijn aanvullend van belang.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'ingegroeide-nagel',
    naam: 'Ingegroeide nagel',
    excerpt: 'Wanneer de nagel met de zijkant of het uiteinde in de huid groeit, spreken we van een ingegroeide nagel. Dit veroorzaakt pijn, roodheid en soms ontsteking.',
    body: [
      'Een ingegroeide nagel ontstaat wanneer de nagel met de zijkant of het uiteinde in het omliggend huidweefsel groeit, wat pijn, roodheid en zwelling aan de nagelwal veroorzaakt. In een vergevorderd stadium kan er een ontsteking of infectie optreden. Onjuiste kniptechniek, te nauw schoeisel en een afwijkende nagelstand zijn veelvoorkomende oorzaken.',
      'Bij VoetSelect behandelen we de ingegroeide nagel door de ingroeiende nagelrand vakkundig te verwijderen. We geven advies over de juiste kniptechniek en het schoeisel. Bij terugkerende klachten worden beugeltjes of andere nagelcorrecties overwogen.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'instabiliteit-enkels',
    naam: 'Instabiliteit enkels',
    excerpt: 'Instabiliteit van de enkels is het meest voorkomend bij kinderen. Veelvuldig zwikken van de enkels is een bekend symptoom.',
    body: [
      'Instabiliteit van de enkels waarbij de enkel makkelijk zwikt, is het meest voorkomend bij kinderen maar treft ook volwassenen. Het kan een gevolg zijn van eerder enkelbandletsel dat niet goed is hersteld, hypermobiliteit of een afwijkende voetstand. Veelvuldig zwikken vergroot het risico op nieuw letsel.',
      'Een podotherapeut onderzoekt de voetstand, de bandenstabiliteit en het looppatroon. Stabiliserende inlegzolen houden de voet in de juiste stand en verkleinen de kans op zwikken. Schoenadvies en balansoefeningenadviezen completeren de behandeling.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'instabiliteit-knie',
    naam: 'Instabiliteit knie',
    excerpt: 'Instabiliteit van de knie komt meestal voor na sportletsel, maar kan ook het gevolg zijn van een afwijkend looppatroon of spierzwakte.',
    body: [
      'Instabiliteit van de knie waarbij de knie "doorslaat" of wegzakt, is een veelvoorkomende klacht na sportletsel (bijv. kruisband- of meniscusletsel), maar kan ook optreden bij spierzwakte of een afwijkende beenstand. De klacht kan leiden tot vermijding van activiteiten.',
      'Een podotherapeut beoordeelt of de voetstand en het looppatroon bijdragen aan de knie-instabiliteit. Inlegzolen die de voet en knie in een betere positie plaatsen verminderen de belasting op de knie en dragen bij aan meer stabiliteit.'
    ],
    gebied: 'knie', kleur: 'terra'
  },
  {
    id: 'inversie-eversietrauma',
    naam: 'Inversie/eversietrauma',
    excerpt: 'Aan de binnen- en buitenkant van de enkels bevinden zich stugge enkelbanden. Bij een inversie- of eversietrauma worden één of meerdere enkelbanden (gedeeltelijk) gescheurd.',
    body: [
      'Bij een inversietrauma (zwikken naar buiten) of eversietrauma (zwikken naar binnen) worden de enkelbanden te ver opgerekt of (gedeeltelijk) gescheurd. Dit veroorzaakt pijn, zwelling en blauwe plekken rondom de enkel. Een goed hersteltraject is essentieel om chronische instabiliteit te voorkomen.',
      'Na de acute fase onderzoekt een podotherapeut de voetstand en loopstabiliteit. Inlegzolen die de voet in een stabielere positie brengen verkleinen de kans op herhaling. Schoenadvies completeert de behandeling.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'jicht',
    naam: 'Jicht',
    excerpt: 'Jicht is een ontsteking van een gewricht als gevolg van urinezuurkristallen die neerslaan in het gewricht. De grote teen is het meest frequent aangedaan.',
    body: [
      'Jicht is een pijnlijke gewrichtsontsteking die ontstaat wanneer urinezuurkristallen neerslaan in een gewricht. De grote teen is het meest frequent aangedaan (podagra), maar ook de enkel, knie en andere gewrichten kunnen betrokken zijn. Klachten bestaan uit plotselinge, hevige pijn, roodheid, warmte en zwelling.',
      'Tijdens een jichtaanval is rust de voornaamste aanpak. Na de aanval beoordeelt een podotherapeut of aanpassing van het schoeisel en inlegzolen de druk op het aangedane gewricht verminderen en toekomstige aanvallen helpen voorkomen.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'jumpers-knee',
    naam: 'Jumpers Knee',
    excerpt: 'Jumpers Knee is een knieklacht als gevolg van en tijdens springen. Er is sprake van irritatie of ontsteking van de kniepees (patellaire pees).',
    body: [
      'Jumpers Knee (patellaire tendinopathie) is een overbelastingsklacht van de kniepees die loopt van de knieschijf naar het scheenbeen. De klacht uit zich als pijn aan de onderzijde van de knieschijf, met name bij springen, landen en hurken. Sporters die intensief springen zijn het meest getroffen.',
      'Een podotherapeut onderzoekt het looppatroon en de beenstand. Inlegzolen die de belasting op de kniepees verminderen via correctie van de voetstand en kniebelasting kunnen de pijn verlichten. Loopadvies en sportadvies zijn aanvullend.'
    ],
    gebied: 'knie', kleur: 'terra'
  },
  {
    id: 'lig-collaterale',
    naam: 'Lig. collaterale laterale/mediale',
    excerpt: 'De binnenste en buitenste kniebanden zorgen voor de stabiliteit van het kniegewricht. Bij beschadiging of overbelasting ontstaan pijnklachten aan de zijkant van de knie.',
    body: [
      'De binnenste (mediale) en buitenste (laterale) kniebanden zorgen voor de zijdelingse stabiliteit van het kniegewricht. Bij een plotselinge draai- of valbeweging kunnen deze banden (gedeeltelijk) scheuren, wat pijn, zwelling en instabiliteit aan de zijkant van de knie veroorzaakt.',
      'Een podotherapeut onderzoekt of de voetstand en het looppatroon bijdragen aan overbelasting van de kniebanden. Inlegzolen die de valgus- of varusstress op de knie verminderen kunnen bijdragen aan het herstel en aan het voorkomen van herhaling.'
    ],
    gebied: 'knie', kleur: 'terra'
  },
  {
    id: 'likdoorn',
    naam: 'Likdoorn',
    excerpt: 'Een likdoorn (eksteroog) is het gevolg van een drukplek, waarbij de huid een harde kern vormt ter bescherming. Dit kan erg pijnlijk zijn.',
    body: [
      'Een likdoorn (eksteroog of clavus) is een kleine, verharde huidverdikking met een harde kern die naar de diepte groeit en drukt op de onderliggende zenuwuiteinden. Dit maakt een likdoorn erg pijnlijk. Chronische druk of wrijving door te nauw schoeisel of een afwijkende teenststand is de voornaamste oorzaak.',
      'Bij VoetSelect verwijderen we de likdoorn vakkundig en onderzoeken we de oorzaak van de overdruk. Door siliconen orthosen, drukverlagende zolen en schoenadvies voorkomen we terugkomst van de likdoorn.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'mtss',
    naam: 'Mediale tibiale stress syndroom (MTSS)',
    excerpt: 'Deze aandoening is meer bekend als "Shin splints" of "Spring schenen". Er is sprake van pijn langs de binnenzijde van het scheenbeen door overbelasting.',
    body: [
      'Het mediale tibiale stress syndroom (MTSS), beter bekend als "shin splints" of "spring schenen", uit zich als pijn langs de binnenzijde van het scheenbeen. De aandoening treft met name hardlopers en sporters die een trainingsintensivering ondergaan. Overbelasting van het bot en de omliggende spieren en pezen is de oorzaak.',
      'Een podotherapeut analyseert het looppatroon en de voetstand om de oorzaak van de overbelasting te achterhalen. Pronatie van de voet is een veelvoorkomende bijdragende factor. Inlegzolen die de pronatiestand corrigeren, gecombineerd met schoenadvies en trainingsadvies, zijn effectieve behandelingsopties.'
    ],
    gebied: 'been', kleur: 'blue'
  },
  {
    id: 'morbus-kohler-i',
    naam: 'Morbus Kohler I',
    excerpt: 'Met name de binnenzijde van de voet is pijnlijk. Dit is het gevolg van een groeistoornis van een botje in de voet (os naviculare) bij kinderen.',
    body: [
      'Morbus Köhler I is een groeistoornis (osteochondrose) van het os naviculare, het scheepvormige voetbeentje aan de binnenzijde van de voet. De doorbloeding raakt verstoord waardoor het botje tijdelijk kan samendrukken. De klacht treft met name jongens van 3 tot 7 jaar en uit zich als pijn en drukgevoeligheid aan de binnenzijde van de voet.',
      'Bij VoetSelect wordt de voetstand en loopbelasting beoordeeld. Ondersteunende inlegzolen verlagen de druk op het aangedane botje en verminderen de pijn. De aandoening geneest doorgaans vanzelf naarmate het kind ouder wordt.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'morbus-kohler-ii',
    naam: 'Morbus Kohler II',
    excerpt: 'Met name het tweede middenvoetsbeentje is pijnlijk en kan zelfs rood en gezwollen zijn. Dit is een groeistoornis van het kopje van het middenvoetsbeentje.',
    body: [
      'Morbus Köhler II (ziekte van Freiberg) is een groeistoornis van het kopje van het tweede (soms derde) middenvoetsbeentje. Door een verstoorde doorbloeding kan het botje vervlakken en samendrukken. Klachten zijn pijn, zwelling en soms roodheid op de voorvoet. De aandoening treft met name tienermeisjes.',
      'Een podotherapeut ontlast het aangedane middenvoetsbeentje met een speciaal gevormd steunzool. Schoenadvies en aanpassing van sportactiviteiten zijn aanvullend van belang om het herstel te bevorderen.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'morbus-ledderhose',
    naam: 'Morbus Ledderhose',
    excerpt: 'Bij Morbus Ledderhose zijn er verdikkingen aanwezig in de peesplaat onder de voet. Dit kan leiden tot pijn en het gevoel van een knobbel onder de voet.',
    body: [
      'Morbus Ledderhose is een aandoening waarbij verdikkingen (fibromatosen) ontstaan in de fascia plantaris, de peesplaat onder de voet. De knobbeltjes zijn voelbaar en soms zichtbaar, en kunnen pijnlijk zijn bij het belasten van de voet. De exacte oorzaak is onbekend, maar genetische aanleg speelt een rol.',
      'Bij VoetSelect ontwerpen we inlegzolen met een uitsparing ter plaatse van de knobbels om directe druk te vermijden. Hiermee wordt de pijn bij het lopen sterk verminderd. In overleg met de behandelend specialist beoordelen we het verdere behandeltraject.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'morbus-osgood-schlatter',
    naam: 'Morbus Osgood Schlatter',
    excerpt: 'Deze aandoening ontstaat door teveel trekkracht van de bovenbeenspier en -pees op de groeischijf van het scheenbeen, voornamelijk bij actieve jongeren.',
    body: [
      'Morbus Osgood-Schlatter is een groeistoornis waarbij de aanhechting van de kniepees op het scheenbeen overbelast raakt door de trekkracht van de bovenbeenspier (quadriceps). Dit veroorzaakt pijn en zwelling vlak onder de knieschijf. De aandoening treft met name actieve jongeren van 10 tot 16 jaar tijdens groeispurten.',
      'Een podotherapeut onderzoekt het looppatroon en de beenstand. Inlegzolen die de trekkracht op de groeischijf verminderen kunnen bijdragen aan pijnverlichting. Sportadvies en looptraining zijn aanvullende pijlers van de behandeling.'
    ],
    gebied: 'knie', kleur: 'terra'
  },
  {
    id: 'morbus-sever',
    naam: 'Morbus Sever',
    excerpt: 'Morbus Sever is een ontstekingsreactie van de groeischijf in het hielbeen. De aandoening komt voor bij actieve kinderen tussen de 8 en 13 jaar.',
    body: [
      'Morbus Sever is een pijnlijke groeistoornis waarbij de groeischijf in het hielbeen overbelast raakt door de trekkracht van de achillespees. De aandoening treft actieve kinderen van 8 tot 13 jaar, met name tijdens groeispurten. Klachten zijn pijn aan de achterzijde van de hiel bij sportactiviteiten.',
      'Bij VoetSelect passen we hielcups aan die de trekkracht van de achillespees op het hielbeen verminderen. Schoenadvies en sportadvies zijn aanvullend. De aandoening is zelflimiterend: na het sluiten van de groeischijf verdwijnen de klachten vanzelf.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'mortonse-neuralgie',
    naam: 'Mortonse neuralgie',
    excerpt: 'Er is sprake van een zenuwinklemming of -verdikking tussen twee middenvoetsbeentjes. Dit veroorzaakt pijn, tintelingen of gevoelloosheid in de teen(en).',
    body: [
      'Mortonse neuralgie is een verdikking of inklemming van een zenuw tussen de middenvoetsbeentjes, meest voorkomend tussen de derde en vierde teen. De klacht uit zich als een brandende, stekende pijn of tintelingen in de betrokken tenenruimte, soms met het gevoel op een knikker te lopen. Nauw schoeisel en overbelasting zijn veelvoorkomende oorzaken.',
      'Bij VoetSelect analyseren we de voetstand en de druk op de voorvoet. Een inlegzool met metatarsaalrol die de druk herverdeelt en de ruimte tussen de middenvoetsbeentjes vergroot, kan de zenuw ontlasten. Schoenadvies (wijder schoeisel, lagere hak) is een essentieel onderdeel.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'patellofemoraal-pijnsyndroom',
    naam: 'Patellofemoraal pijnsyndroom',
    excerpt: 'Bij dit syndroom functioneert de knieschijf niet goed waardoor pijnklachten ontstaan, met name bij traplopen, hurken, fietsen en lang zitten.',
    body: [
      'Het patellofemoraal pijnsyndroom (PFPS) is een pijnklacht rondom de knieschijf die ontstaat door een verstoorde beweging van de knieschijf in de knieschijfgroeve. Klachten treden op bij traplopen, hurken, langdurig zitten met gebogen knie en sporten. Spierbalans, beenstand en voetstand spelen een rol bij het ontstaan.',
      'Een podotherapeut analyseert het looppatroon en de stand van voeten, knieën en heupen. Inlegzolen die de voetstand en belasting van de knieschijf corrigeren verminderen de klachten sterk. Gerichte spieroefeningenadviezen zijn een aanvulling.'
    ],
    gebied: 'knie', kleur: 'terra'
  },
  {
    id: 'piriformis-syndroom',
    naam: 'Piriformis syndroom',
    excerpt: 'De musculus piriformis loopt van het stuitje naar de heupkop. Wanneer deze spier de heupzenuw inklemd, kunnen uitstralende pijn en tintelingen in het been ontstaan.',
    body: [
      'Het piriformis syndroom ontstaat wanneer de musculus piriformis (een diepe heupspier) de nervus ischiadicus (heupzenuw) inklemd of irriteert. Dit veroorzaakt pijn in het zitvlak en uitstralende pijn in het been, vergelijkbaar met ischias. Langdurig zitten, bepaalde sporten en een beenlengteverschil kunnen bijdragen.',
      'Een podotherapeut analyseert het looppatroon en de bekkenstand. Een beenlengteverschil wordt gecorrigeerd via inlegzolen, wat de druk op de piriformissspier vermindert. Schoenadvies en strek- en krachtoefeningen zijn aanvullend van belang.'
    ],
    gebied: 'heup', kleur: 'gold'
  },
  {
    id: 'runners-toe',
    naam: 'Runners Toe',
    excerpt: 'Bij een runners toe is er sprake van een bloeding onder de nagel veroorzaakt door herhaaldelijk aanstoten van de teen aan het schoenfront bij het lopen.',
    body: [
      'Een runners toe (subunguaal hematoom) is een bloeding onder de nagel door herhaaldelijk aanstoten van de teen aan het schoenfront bij het lopen of hardlopen. Dit geeft een donkere verkleuring en pijn aan de nagel. In ernstige gevallen kan de nagel loslaten. Te klein schoeisel of naar voren glijden in de schoen zijn veelvoorkomende oorzaken.',
      'Bij VoetSelect geven we schoenadvies om aanstoten van de teen te voorkomen. Inlegzolen die de voet stabiliseren en het naar voren glijden beperken verminderen de druk op de nagel. Bij een ernstig hematoom kan drukverlaging van de nagel noodzakelijk zijn.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'sand-toe',
    naam: 'Sand Toe',
    excerpt: 'Bij een sand toe is er sprake van een hyperflexietrauma van het gewricht van de grote teen, vaak door indrukken van de teen in een zachte ondergrond zoals zand.',
    body: [
      'Een sand toe is een hyperflexietrauma van het metatarsofalangeale gewricht van de grote teen. De teen wordt door een zachte ondergrond (zoals zand) te ver naar beneden gebogen, waardoor de bandstructuren boven het gewricht worden beschadigd. Dit veroorzaakt pijn, zwelling en beperkte beweeglijkheid van de grote teen.',
      'Bij VoetSelect beoordelen we het gewricht en adviseren we over ontlasting en herstel. Een stevig steunzool of teenorthese stabiliseert de teen en vermindert de pijn bij het lopen. Schoenadvies is aanvullend van belang.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'schimmelnagels',
    naam: 'Schimmelnagels',
    excerpt: 'De nagels vertonen een geelbruine verkleuring en brokkelen makkelijk af. Schimmelnagels zijn het gevolg van een schimmelinfectie van de nagel.',
    body: [
      'Schimmelnagels (onychomycose) zijn het gevolg van een schimmelinfectie van de nagel. De nagels verkleuren geelbruin, worden dikker en brokkelen makkelijk af. De infectie begint meestal aan de nagelpunt en verspreidt zich naar de nagelwortel. Openbare ruimten met vochtige omgevingen zijn veelvoorkomende besmettingsbronnen.',
      'Bij VoetSelect verwijderen we het aangetaste nagelmateriaal vakkundig en adviseren we over de juiste nagelbehandeling en -hygiëne. In combinatie met schoenadvies om vocht en warmte te beperken vermindert de kans op terugkeer van de infectie.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'scoliose',
    naam: 'Scoliose',
    excerpt: 'Een zijwaartse kromming van de wervelkolom wordt scoliose genoemd. Dit kan pijnklachten veroorzaken in de rug en invloed hebben op het looppatroon.',
    body: [
      'Scoliose is een zijwaartse S- of C-vormige kromming van de wervelkolom. Bij een idiopathische scoliose is de oorzaak onbekend; bij een functionele scoliose kan een beenlengteverschil of spieronbalans aan de basis liggen. Scoliose kan leiden tot rugpijn en ongelijke schouder- of bekkenhoogte.',
      'Een podotherapeut onderzoekt of een beenlengteverschil bijdraagt aan de functionele scoliose. Een compenserende verhoging in het schoeisel corrigeert de scheefstand van het bekken en ontlast de wervelkolom. Dit is een aanvulling naast de begeleiding door een specialist.'
    ],
    gebied: 'wervelkolom', kleur: 'sage'
  },
  {
    id: 'sesamoiditis',
    naam: 'Sesamoïditis',
    excerpt: 'Dit is een ontsteking van het kleine sesamoïde botfragment dat verweven zit in een pees onder het gewricht van de grote teen.',
    body: [
      'Sesamoïditis is een pijnlijke ontsteking van het sesamoïde botje (of de omringende pees en weke delen) dat zich onder het gewricht van de grote teen bevindt. De klacht uit zich als pijn onder de grote teen bij belasten en afstoten. Overbelasting, een hoge voetboog en stijf schoeisel zijn veelvoorkomende oorzaken.',
      'Bij VoetSelect ontlasten we het sesamoïd door de afwikkeling via de grote teen te begeleiden met een speciaal gevormd zool. Schoenadvies dat de druk op de bal van de voet vermindert is aanvullend van belang.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'sinus-tarsi-syndroom',
    naam: 'Sinus tarsi syndroom',
    excerpt: 'De sinus tarsi is een holte in het gewricht aan de buitenzijde van de enkel. Irritatie of ontsteking leidt tot pijn aan de buitenzijde van de enkel.',
    body: [
      'Het sinus tarsi syndroom is een aandoening waarbij de sinus tarsi, een kleine holte aan de buitenzijde van de enkel, geïrriteerd of ontstoken is. Klachten zijn pijn aan de buitenzijde van de enkel bij lopen over oneffen terrein, en het gevoel van instabiliteit. De aandoening ontstaat vaak na een enkelverzwikking die niet goed is hersteld.',
      'Een podotherapeut onderzoekt de voetstand en de enkelstabiliteit. Inlegzolen die de pronatie corrigeren en de sinus tarsi ontlasten kunnen de klachten sterk verminderen. Schoenadvies met voldoende enkelsteun is aanvullend.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'tarsaal-tunnel-syndroom',
    naam: 'Tarsaal tunnel syndroom',
    excerpt: 'De tarsale tunnel bevindt zich aan de binnenzijde van de enkel. Bij inklemming van de zenuw in deze tunnel ontstaan tintelingen, brandende pijn en gevoelsstoornissen in de voet.',
    body: [
      'Het tarsaal tunnel syndroom is een zenuwinklemming van de nervus tibialis posterior in de tunnel aan de binnenzijde van de enkel. Klachten zijn tintelingen, brandende pijn, gevoelsstoornissen of pijn uitstralend naar de zool en de tenen. De klachten verergeren bij langdurig staan of lopen.',
      'Bij VoetSelect onderzoeken we de voetstand en beoordelen we of overmatige pronatie bijdraagt aan de inklemming. Inlegzolen die de voetstand corrigeren en de druk op de tarsale tunnel verminderen verlichten de klachten effectief.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'tractus-iliotibialis',
    naam: 'Tractus iliotibialis frictie syndroom',
    excerpt: 'Dit is een overbelastingsklacht van de tractus iliotibialis, een pees/band aan de buitenzijde van de knie die bij herhaaldelijk buigen en strekken over de knie wrijft.',
    body: [
      'Het tractus iliotibialis frictie syndroom (ITBS) is een overbelastingsklacht waarbij de tractus iliotibialis, een stevige band van heup naar knie, over het buitenste kniegewricht wrijft. Dit veroorzaakt pijn en brandend gevoel aan de buitenzijde van de knie, met name bij hardlopen, fietsen en traplopen.',
      'Een podotherapeut analyseert het looppatroon en de voetstand. Inlegzolen die de pronatie corrigeren en de spanning op de tractus iliotibialis verminderen verlichten de klachten. Looptraining, aanpassing van het trainingsschema en gerichte stretching zijn aanvullend.'
    ],
    gebied: 'knie', kleur: 'terra'
  },
  {
    id: 'turf-toe',
    naam: 'Turf Toe',
    excerpt: 'Bij turf toe heeft het gewricht van de grote teen een te grote of herhaalde beweging naar boven gemaakt, wat leidt tot beschadiging van de bandstructuren.',
    body: [
      'Turf toe is een hyperextensietrauma van het gewricht van de grote teen, waarbij de teen te ver naar boven wordt gebogen. De banden aan de onderzijde van het gewricht worden hierbij beschadigd of gescheurd. Dit veroorzaakt pijn, zwelling en beperkte beweeglijkheid van de grote teen. De aandoening komt voor bij sporters op kunstgras.',
      'Bij VoetSelect stabiliseren we de grote teen met een verstevigd inlegzool of teenorthese om verdere overextensie te beperken. Schoenadvies (stijvere schoenzool) en sportadvies completeren de behandeling.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'vaatlijden',
    naam: 'Vaatlijden',
    excerpt: 'Beschadiging van de bloedvaten kan veroorzaakt worden door uiteenlopende aandoeningen. Klachten kunnen bestaan uit koude, bleke of pijnlijke voeten en benen.',
    body: [
      'Vaatlijden aan de benen en voeten omvat aandoeningen van de slagaders (arterieel) of aders (veneus). Klachten kunnen zijn koude, bleke of pijnlijke voeten en benen, krampen bij inspanning of zwelling en huidveranderingen. Diabetes, roken en een verhoogd cholesterol zijn risicofactoren.',
      'Bij VoetSelect zijn we alert op signalen van vaatlijden bij het onderzoek. We verwijzen tijdig door naar de huisarts of specialist. Schoenadvies gericht op het voorkomen van druk- en wrijvingsplekken bij de kwetsbare voet maakt deel uit van onze begeleiding.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'veelvuldig-struikelen',
    naam: 'Veelvuldig struikelen',
    excerpt: 'Veelvuldig struikelen kan het gevolg zijn van een afwijkend looppatroon, spierzwakte of neurologische oorzaken. Tijdens de groei is een goed looppatroon van groot belang.',
    body: [
      'Veelvuldig struikelen kan het gevolg zijn van een afwijkend looppatroon, verminderde kracht in voet- of beenspieren, een verstoorde proprioceptie of neurologische oorzaken. Bij kinderen is struikelen soms normaal tijdens groeifases, maar aanhoudende klachten verdienen nader onderzoek.',
      'Een podotherapeut analyseert het looppatroon uitgebreid om de oorzaak te achterhalen. Inlegzolen die de afwikkeling van de voet verbeteren kunnen het looppatroon normaliseren en struikelen voorkomen.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'vermoeide-voeten',
    naam: 'Vermoeide voeten en/of benen',
    excerpt: 'Vermoeidheid in de voeten en/of benen kan voortkomen uit een afwijkend looppatroon, spierzwakte of overbelasting. Bij kinderen is dit een veelgehoorde klacht.',
    body: [
      'Vermoeidheid in de voeten en/of benen is een veelgehoorde klacht bij zowel kinderen als volwassenen. Oorzaken zijn een afwijkend looppatroon, een vlakke voet, hypermobiliteit, spierzwakte of overbelasting. Bij kinderen gaat de klacht soms gepaard met pijn in de onderbenen.',
      'Bij VoetSelect beoordelen we de voetstand, spierkracht en het looppatroon. Ondersteunende inlegzolen die de voet in de juiste stand houden verminderen de spierspanning en vermoeidheid. Schoenadvies is een aanvulling op de behandeling.'
    ],
    gebied: 'voet', kleur: 'green'
  },
  {
    id: 'wratten',
    naam: 'Wratten',
    excerpt: 'Wratten (verrucae) op de voet ontstaan door een virusinfectie en kenmerken zich door pijnlijke, harde, in de huid ingroeiende plekken op de zool of de hielen.',
    body: [
      'Wratten op de voet (verrucae plantares) worden veroorzaakt door het humaan papillomavirus (HPV). Ze kenmerken zich door in de huid ingroeiende, harde en pijnlijke plekken op de zool, hiel of tenentoppen. In tegenstelling tot gewone wratten groeien plantar wratten naar binnen door het lichaamsgewicht. Ze zijn besmettelijk via direct huidcontact of gedeelde ondergrond.',
      'Bij VoetSelect behandelen we wratten met bewezen effectieve methoden zoals cryotherapie (bevriezen) of chemische behandeling met salicylzuur. Naast de behandeling geven we advies om herbesmetting te voorkomen, zoals het dragen van slippers bij openbare douches en zwembaden.'
    ],
    gebied: 'voet', kleur: 'green'
  }
];
