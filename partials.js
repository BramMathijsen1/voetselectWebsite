/* Shared header and footer — edit the HTML strings below to update every page */
(function () {
  var HEADER_HTML = `
<header class="site-header">
  <div class="header-inner">
    <a href="index.html" class="logo">
      <img src="img/logo-white.png" alt="VoetSelect Podotherapie" class="logo-img">
    </a>

    <button class="menu-toggle" id="menuToggle" aria-expanded="false" aria-controls="primaryNav">
      <span class="menu-label">Menu</span>
      <span class="menu-icon" aria-hidden="true">
        <span></span><span></span><span></span>
      </span>
    </button>

    <nav class="primary-nav" id="primaryNav" aria-hidden="true">
      <div class="primary-nav-circle" aria-hidden="true"></div>
      <div class="primary-nav-inner">
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="behandelingen.html">Behandelingen</a></li>
          <li><a href="maatslippers.html">Maatslippers</a></li>
          <li><a href="aandoeningen.html">Aandoeningen</a></li>
          <li><a href="ons-onderzoek.html">Ons onderzoek</a></li>
          <li><a href="overons.html">Over ons</a></li>
          <li><a href="tarieven.html">Tarieven</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
    </nav>
  </div>
</header>
`;

  var FOOTER_HTML = `
<section class="affiliations">
  <h3>Wij zijn aangesloten bij:</h3>
  <div class="affiliations-row">
    <a href="https://www.podotherapie.nl/" target="_blank" rel="noopener" aria-label="NVvP — Nederlandse Vereniging van Podotherapeuten">
      <img src="img/logo-nvvp.svg" alt="NVvP — Nederlandse Vereniging van Podotherapeuten">
    </a>
    <a href="https://www.kwaliteitsregisterparamedici.nl/" target="_blank" rel="noopener" aria-label="Kwaliteitsregister Paramedici">
      <img src="img/logo-kp-kwaliteitsregister.jpg" alt="Kwaliteitsgeregistreerd — Kwaliteitsregister Paramedici">
    </a>
    <a href="https://www.scascertificering.nl/" target="_blank" rel="noopener" aria-label="SCAS gecertificeerd">
      <img src="img/logo-scas.jpeg" alt="SCAS gecertificeerd">
    </a>
    <a href="https://www.acupunctuur.nl/" target="_blank" rel="noopener" aria-label="Nederlandse Vereniging voor Acupunctuur">
      <img src="img/logo-nva-acupunctuur.jpeg" alt="Nederlandse Vereniging voor Acupunctuur">
    </a>
    <a href="https://www.kab-koepel.nl/" target="_blank" rel="noopener" aria-label="KAB Koepel">
      <img src="img/logo-kab-koepel.png" alt="KAB Koepel">
    </a>
  </div>
</section>

<footer class="site-footer">
  <div class="footer-logo-wrap container">
    <a href="index.html">
      <img src="img/logo-white.png" alt="VoetSelect Podotherapie" class="logo-img logo-img--footer">
    </a>
  </div>

  <div class="container footer-grid">

    <div class="footer-col">
      <h6>Openingstijden</h6>
      <p class="footer-hours">
        Maandag t/m vrijdag<br>
        09:00 &ndash; 17:30 uur
      </p>
    </div>

    <div class="footer-col">
      <h6>Contact</h6>
      <p>
        <a href="tel:+31628874712">+31 6 28874712</a><br>
        <a href="tel:0735478816">(073) 547 88 16</a><br>
        <a href="mailto:info@voetselect.nl">info@voetselect.nl</a>
      </p>
    </div>

    <div class="footer-col">
      <h6>Adres Schijndel</h6>
      <p>
        Catharinaplein 36<br>
        5482 HJ Schijndel
      </p>
      <p class="footer-note">
        <strong>Let op!</strong> Navigeer naar Akkerstraat 8, 5482 HJ. De praktijk bevindt zich aan de achterzijde van dit adres, bij de gevel met blauwe deuren.
      </p>
    </div>

    <div class="footer-col">
      <h6>Informatie</h6>
      <ul class="footer-links">
        <li><a href="veelgestelde-vragen.html">Veel gestelde vragen</a></li>
        <li><a href="privacyverklaring.html">Privacyverklaring</a></li>
        <li><a href="algemene-voorwaarden.html">Algemene voorwaarden</a></li>
        <li><a href="mdr-verklaring.html">MDR-Conformiteit verklaring</a></li>
      </ul>
    </div>

  </div>

  <div class="footer-bottom container">
    <p>&copy; <span id="year"></span> VoetSelect Podotherapie. Alle rechten voorbehouden.</p>
  </div>
</footer>

<a class="wa-float" href="https://wa.me/31628874712?text=Hoi%20VoetSelect%20Podotherapie%2C%20ik%20heb%20een%20vraag:" target="_blank" rel="noopener" aria-label="Stuur ons een WhatsApp bericht">
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>
`;

  var QUIZ_MODAL_HTML = `
<div class="quiz-overlay" id="quizOverlay" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="quizHeading">
  <div class="quiz-modal">
    <button type="button" class="quiz-close" id="quizClose" aria-label="Quiz sluiten">&times;</button>
    <div class="quiz-deco" aria-hidden="true"></div>

    <!-- Vraag 1 -->
    <div class="quiz-step is-active" id="quizStep1">
      <div class="quiz-meta">
        <span class="quiz-counter">Vraag 1 van 3</span>
        <div class="quiz-progress-track"><div class="quiz-progress-fill quiz-progress-fill--1"></div></div>
      </div>
      <h3 id="quizHeading" class="quiz-question">Waar heeft u pijn of klachten?</h3>
      <div class="quiz-options">
        <button type="button" class="quiz-option" data-value="Voet">Voet</button>
        <button type="button" class="quiz-option" data-value="Enkel">Enkel</button>
        <button type="button" class="quiz-option" data-value="Knie">Knie</button>
        <button type="button" class="quiz-option" data-value="Heup of rug">Heup of rug</button>
        <button type="button" class="quiz-option" data-value="Geen klachten / Anders">Geen klachten / Anders</button>
      </div>
      <div class="quiz-nav">
        <button type="button" class="btn btn-primary quiz-next" data-next="quizStep2" disabled>Volgende</button>
      </div>
    </div>

    <!-- Vraag 2 -->
    <div class="quiz-step" id="quizStep2">
      <div class="quiz-meta">
        <span class="quiz-counter">Vraag 2 van 3</span>
        <div class="quiz-progress-track"><div class="quiz-progress-fill quiz-progress-fill--2"></div></div>
      </div>
      <h3 class="quiz-question">Hoe lang heeft u deze klachten al?</h3>
      <div class="quiz-options">
        <button type="button" class="quiz-option" data-value="Minder dan 2 weken">Minder dan 2 weken</button>
        <button type="button" class="quiz-option" data-value="2 tot 6 weken">2 tot 6 weken</button>
        <button type="button" class="quiz-option" data-value="Langer dan 6 weken">Langer dan 6 weken</button>
        <button type="button" class="quiz-option" data-value="Al meer dan een jaar">Al meer dan een jaar</button>
      </div>
      <div class="quiz-nav">
        <button type="button" class="quiz-back" data-prev="quizStep1">Terug</button>
        <button type="button" class="btn btn-primary quiz-next" data-next="quizStep3" disabled>Volgende</button>
      </div>
    </div>

    <!-- Vraag 3 -->
    <div class="quiz-step" id="quizStep3">
      <div class="quiz-meta">
        <span class="quiz-counter">Vraag 3 van 3</span>
        <div class="quiz-progress-track"><div class="quiz-progress-fill quiz-progress-fill--3"></div></div>
      </div>
      <h3 class="quiz-question">Wanneer zijn de klachten het ergst?</h3>
      <div class="quiz-options">
        <button type="button" class="quiz-option" data-value="'s Ochtends bij het opstaan">'s Ochtends bij het opstaan</button>
        <button type="button" class="quiz-option" data-value="Na lang lopen of staan">Na lang lopen of staan</button>
        <button type="button" class="quiz-option" data-value="Tijdens het sporten">Tijdens het sporten</button>
        <button type="button" class="quiz-option" data-value="De hele dag door">De hele dag door</button>
      </div>
      <div class="quiz-nav">
        <button type="button" class="quiz-back" data-prev="quizStep2">Terug</button>
        <button type="button" class="btn btn-primary quiz-next" data-next="quizForm" disabled>Bekijk resultaat</button>
      </div>
    </div>

    <!-- Afspraak form -->
    <div class="quiz-step" id="quizForm">
      <h3 class="quiz-question">Maak een afspraak</h3>
      <p class="quiz-form-intro">Op basis van uw antwoorden maken wij graag een afspraak voor u.</p>
      <div class="quiz-summary" id="quizSummary" aria-live="polite"></div>
      <form class="quiz-form" id="appointmentForm" novalidate>
        <div class="form-row">
          <div class="form-field">
            <label for="fname">Naam <span aria-hidden="true">*</span></label>
            <input type="text" id="fname" name="naam" required autocomplete="name" placeholder="Uw volledige naam">
          </div>
          <div class="form-field">
            <label for="femail">E-mail <span aria-hidden="true">*</span></label>
            <input type="email" id="femail" name="email" required autocomplete="email" placeholder="uw@email.nl">
          </div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label for="fphone">Telefoonnummer</label>
            <input type="tel" id="fphone" name="telefoon" autocomplete="tel" placeholder="06 00 00 00 00">
          </div>
          <div class="form-field">
            <label for="fdate">Gewenste datum</label>
            <input type="date" id="fdate" name="datum">
          </div>
        </div>
        <div class="form-field">
          <label for="fnotes">Opmerkingen</label>
          <textarea id="fnotes" name="opmerkingen" rows="3" placeholder="Eventuele extra informatie..."></textarea>
        </div>
        <div class="form-field">
          <div class="h-captcha" data-captcha="true"></div>
        </div>
        <p class="form-error" id="appointmentFormError" hidden>Er ging iets mis bij het versturen. Probeer het opnieuw of bel ons.</p>
        <div class="quiz-nav">
          <button type="button" class="quiz-back" data-prev="quizStep3">Terug</button>
          <button type="submit" class="btn btn-primary">Afspraak aanvragen</button>
        </div>
      </form>
    </div>

    <!-- Bevestiging -->
    <div class="quiz-step" id="quizSuccess">
      <div class="quiz-success-icon" aria-hidden="true">
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="10,26 20,36 38,14"/>
        </svg>
      </div>
      <h3 class="quiz-question">Aanvraag verstuurd!</h3>
      <p>Bedankt voor uw aanvraag. Wij nemen zo snel mogelijk contact met u op om een afspraak in te plannen.</p>
      <button type="button" class="btn btn-primary" id="quizDoneBtn">Sluiten</button>
    </div>

  </div>
</div>
`;

  function inject(html, placeholderId) {
    var el = document.getElementById(placeholderId);
    if (!el) return;
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    el.replaceWith.apply(el, Array.from(tmp.childNodes));
  }

  inject(HEADER_HTML, 'header-placeholder');
  inject(FOOTER_HTML, 'footer-placeholder');
  inject(QUIZ_MODAL_HTML, 'quiz-modal-placeholder');

  /* Mark the active nav link */
  var activePage = document.body.dataset.activePage
    || window.location.pathname.split('/').pop()
    || 'index.html';

  document.querySelectorAll('.primary-nav-inner a[href]').forEach(function (a) {
    if (a.getAttribute('href') === activePage) {
      a.classList.add('nav-active');
    }
  });

  /* Set footer year */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Signal that header/footer are in the DOM */
  document.dispatchEvent(new Event('partialsLoaded'));
}());
