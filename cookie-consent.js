/* Cookie consent: gates Google Analytics until the visitor actually accepts.
   Required under AVG/GDPR + the Dutch Cookiewet: non-essential (statistics)
   cookies may not be set before consent is given, and declining must be as
   easy as accepting. */
(function () {
  var GA_ID = 'G-R4C8R8138Y';
  var STORAGE_KEY = 'cookieConsent';

  function getConsent() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function setConsent(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* ignore */ }
  }

  function loadAnalytics() {
    if (window.dataLayer) return; // already loaded this page view
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  function showBanner() {
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Cookiemelding');
    banner.innerHTML =
      '<div class="cookie-banner-inner">' +
        '<p>Wij gebruiken alleen cookies voor website-statistieken (Google Analytics), en pas nadat u hiervoor toestemming geeft. Meer informatie leest u in onze <a href="privacyverklaring.html">privacyverklaring</a>.</p>' +
        '<div class="cookie-banner-actions">' +
          '<button type="button" class="btn btn-outline-white cookie-banner-decline">Weigeren</button>' +
          '<button type="button" class="btn btn-primary cookie-banner-accept">Accepteren</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(banner);

    banner.querySelector('.cookie-banner-accept').addEventListener('click', function () {
      setConsent('accepted');
      loadAnalytics();
      banner.remove();
    });
    banner.querySelector('.cookie-banner-decline').addEventListener('click', function () {
      setConsent('declined');
      banner.remove();
    });
  }

  var consent = getConsent();
  if (consent === 'accepted') {
    loadAnalytics();
  } else if (consent !== 'declined') {
    showBanner();
  }
}());
