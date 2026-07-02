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
        <li><a href="#">Veel gestelde vragen</a></li>
        <li><a href="#">Privacyverklaring</a></li>
        <li><a href="#">Algemene voorwaarden</a></li>
        <li><a href="#">MDR-Conformiteit verklaring</a></li>
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

  function inject(html, placeholderId) {
    var el = document.getElementById(placeholderId);
    if (!el) return;
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    el.replaceWith.apply(el, Array.from(tmp.childNodes));
  }

  inject(HEADER_HTML, 'header-placeholder');
  inject(FOOTER_HTML, 'footer-placeholder');

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
