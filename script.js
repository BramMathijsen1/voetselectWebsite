document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('primaryNav');
  const navLinks = nav.querySelectorAll('a');
  const label = toggle.querySelector('.menu-label');

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open);
    document.body.classList.toggle('menu-open', open && window.innerWidth < 1000);
    if (label) {
      const next = (open && window.innerWidth >= 1000) ? '✕' : 'Menu';
      if (label.textContent !== next) {
        label.classList.add('is-switching');
        const onEnd = (e) => {
          if (e.propertyName !== 'opacity') return;
          label.removeEventListener('transitionend', onEnd);
          label.textContent = next;
          label.classList.remove('is-switching');
        };
        label.addEventListener('transitionend', onEnd);
      }
    }

    if (window.innerWidth < 1000) {
      nav.setAttribute('aria-hidden', !open);
    } else {
      nav.setAttribute('aria-hidden', 'false');
    }
  };

  // Set correct initial aria-hidden for current viewport
  setOpen(false);


  toggle.addEventListener('click', () => {
    setOpen(!nav.classList.contains('is-open'));
  });

  // Close the menu after choosing a link
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      // Desktop: shrink the circle first, then navigate after the transition
      if (window.innerWidth >= 1000 && nav.classList.contains('is-open')) {
        const href = link.getAttribute('href');
        if (href && href !== '#' && !href.startsWith('#') && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
          e.preventDefault();
          setOpen(false);
          setTimeout(() => { window.location.href = href; }, 560);
          return;
        }
      }
      setOpen(false);
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Reset state if resizing to desktop while open
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1000 && nav.classList.contains('is-open')) {
      setOpen(false);
    }
  });

});

// Quiz
(function () {
  const overlay = document.getElementById('quizOverlay');
  if (!overlay) return;

  const LABELS = {
    quizStep1: 'Klachtenlocatie',
    quizStep2: 'Duur klachten',
    quizStep3: 'Ergst moment',
  };

  const state = { answers: {}, captchaAnswer: 0 };

  function showStep(id) {
    overlay.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('is-active'));
    document.getElementById(id).classList.add('is-active');
    if (id === 'quizForm') { buildSummary(); generateCaptcha(); }
    overlay.querySelector('.quiz-modal').scrollTop = 0;
  }

  function openQuiz() {
    state.answers = {};
    overlay.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('is-selected'));
    overlay.querySelectorAll('.quiz-next').forEach(b => { b.disabled = true; });
    document.getElementById('appointmentForm').reset();
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    showStep('quizStep1');
  }

  function closeQuiz() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  }

  function generateCaptcha() {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    state.captchaAnswer = a + b;
    document.getElementById('captchaQuestion').textContent = `Wat is ${a} + ${b}?`;
    document.getElementById('fcaptcha').value = '';
    document.getElementById('fcaptcha').classList.remove('is-invalid');
  }

  function buildSummary() {
    document.getElementById('quizSummary').innerHTML = Object.entries(state.answers)
      .map(([label, value]) =>
        `<div class="quiz-summary-item">
          <span class="quiz-summary-label">${label}</span>
          <span class="quiz-summary-value">${value}</span>
        </div>`)
      .join('');
  }

  document.querySelectorAll('[data-open-quiz]').forEach(btn => btn.addEventListener('click', openQuiz));

  document.getElementById('quizClose').addEventListener('click', closeQuiz);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeQuiz(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeQuiz();
  });

  overlay.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const stepEl = btn.closest('.quiz-step');
      stepEl.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      state.answers[LABELS[stepEl.id]] = btn.dataset.value;
      stepEl.querySelector('.quiz-next').disabled = false;
    });
  });

  overlay.querySelectorAll('.quiz-next').forEach(btn => {
    btn.addEventListener('click', () => showStep(btn.dataset.next));
  });

  overlay.querySelectorAll('.quiz-back').forEach(btn => {
    btn.addEventListener('click', () => showStep(btn.dataset.prev));
  });

  document.getElementById('quizDoneBtn').addEventListener('click', closeQuiz);

  document.getElementById('appointmentForm').addEventListener('submit', e => {
    e.preventDefault();
    const form = e.target;
    let valid = true;

    ['naam', 'email'].forEach(name => {
      const el = form[name];
      const filled = el.value.trim() !== '';
      el.classList.toggle('is-invalid', !filled);
      if (!filled) valid = false;
    });

    const captchaEl = document.getElementById('fcaptcha');
    const captchaCorrect = parseInt(captchaEl.value, 10) === state.captchaAnswer;
    captchaEl.classList.toggle('is-invalid', !captchaCorrect);
    if (!captchaCorrect) valid = false;

    if (!valid) return;

    const quizLines = Object.entries(state.answers).map(([k, v]) => `${k}: ${v}`).join('\n');
    const body = [
      `Naam: ${form.naam.value}`,
      `Email: ${form.email.value}`,
      `Telefoon: ${form.telefoon.value}`,
      `Gewenste datum: ${form.datum.value}`,
      '',
      'Klachtenanalyse:',
      quizLines,
      '',
      `Opmerkingen: ${form.opmerkingen.value}`,
    ].join('\n');

    window.location.href = `mailto:info@voetselect.nl?subject=${encodeURIComponent('Afspraakverzoek – ' + form.naam.value)}&body=${encodeURIComponent(body)}`;
    showStep('quizSuccess');
  });
}());

// Vergoeding check
(function () {
  const overlay = document.getElementById('vergoedingOverlay');
  if (!overlay) return;

  let selectedInsurer = '';

  function showStep(id) {
    overlay.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('is-active'));
    document.getElementById(id).classList.add('is-active');
    overlay.querySelector('.quiz-modal').scrollTop = 0;
  }

  function open() {
    selectedInsurer = '';
    overlay.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('is-selected'));
    document.getElementById('vergNextBtn').disabled = true;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    showStep('vergStep1');
  }

  function close() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  }

  document.querySelectorAll('[data-open-vergoeding]').forEach(btn => btn.addEventListener('click', open));
  document.getElementById('vergoedingClose').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
  });

  overlay.querySelectorAll('#vergStep1 .quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      overlay.querySelectorAll('#vergStep1 .quiz-option').forEach(b => b.classList.remove('is-selected'));
      btn.classList.add('is-selected');
      selectedInsurer = btn.dataset.value;
      document.getElementById('vergNextBtn').disabled = false;
    });
  });

  document.getElementById('vergNextBtn').addEventListener('click', () => {
    document.getElementById('vergResultInsurer').textContent = selectedInsurer;
    showStep('vergResult');
  });

  document.getElementById('vergBackBtn').addEventListener('click', () => showStep('vergStep1'));
}());

// Ailment appointment quiz (aandoening.html)
(function () {
  var overlay = document.getElementById('ailmentQuizOverlay');
  if (!overlay) return;

  var STEP_LABELS = {
    ailmentStep1: 'Duur klachten',
    ailmentStep2: 'Ernst klachten',
    ailmentStep3: 'Ergst moment',
  };

  var state = { answers: {}, captchaAnswer: 0, ailmentNaam: '' };

  function showStep(id) {
    overlay.querySelectorAll('.quiz-step').forEach(function (s) { s.classList.remove('is-active'); });
    document.getElementById(id).classList.add('is-active');
    if (id === 'ailmentForm') { buildSummary(); generateCaptcha(); }
    overlay.querySelector('.quiz-modal').scrollTop = 0;
  }

  function openQuiz(naam) {
    state.answers = {};
    state.ailmentNaam = naam || '';
    overlay.querySelectorAll('.quiz-option').forEach(function (b) { b.classList.remove('is-selected'); });
    overlay.querySelectorAll('.quiz-next').forEach(function (b) { b.disabled = true; });
    var formEl = document.getElementById('ailmentAppointmentForm');
    if (formEl) formEl.reset();
    var badgeEl = document.getElementById('ailmentQuizNaam');
    if (badgeEl && naam) badgeEl.textContent = naam;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    showStep('ailmentStep1');
  }

  function closeQuiz() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  }

  function generateCaptcha() {
    var a = Math.floor(Math.random() * 9) + 1;
    var b = Math.floor(Math.random() * 9) + 1;
    state.captchaAnswer = a + b;
    document.getElementById('ailmentCaptchaQ').textContent = 'Wat is ' + a + ' + ' + b + '?';
    var ci = document.getElementById('ailmentCaptcha');
    if (ci) { ci.value = ''; ci.classList.remove('is-invalid'); }
  }

  function buildSummary() {
    var items = [{ label: 'Aandoening', value: state.ailmentNaam }].concat(
      Object.entries(state.answers).map(function (e) { return { label: e[0], value: e[1] }; })
    );
    document.getElementById('ailmentQuizSummary').innerHTML = items.map(function (item) {
      return '<div class="quiz-summary-item"><span class="quiz-summary-label">' + item.label + '</span><span class="quiz-summary-value">' + item.value + '</span></div>';
    }).join('');
  }

  document.querySelectorAll('[data-open-ailment-quiz]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openQuiz(btn.dataset.ailmentNaam || '');
    });
  });

  document.getElementById('ailmentQuizClose').addEventListener('click', closeQuiz);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeQuiz(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeQuiz();
  });

  overlay.querySelectorAll('.quiz-option').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var stepEl = btn.closest('.quiz-step');
      stepEl.querySelectorAll('.quiz-option').forEach(function (b) { b.classList.remove('is-selected'); });
      btn.classList.add('is-selected');
      state.answers[STEP_LABELS[stepEl.id]] = btn.dataset.value;
      stepEl.querySelector('.quiz-next').disabled = false;
    });
  });

  overlay.querySelectorAll('.quiz-next').forEach(function (btn) {
    btn.addEventListener('click', function () { showStep(btn.dataset.next); });
  });

  overlay.querySelectorAll('.quiz-back').forEach(function (btn) {
    btn.addEventListener('click', function () { showStep(btn.dataset.prev); });
  });

  document.getElementById('ailmentQuizDoneBtn').addEventListener('click', closeQuiz);

  document.getElementById('ailmentAppointmentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var form = e.target;
    var valid = true;

    ['ailmentNaamInput', 'ailmentEmailInput'].forEach(function (id) {
      var el = document.getElementById(id);
      var ok = el.value.trim() !== '';
      el.classList.toggle('is-invalid', !ok);
      if (!ok) valid = false;
    });

    var captchaEl = document.getElementById('ailmentCaptcha');
    var captchaOk = parseInt(captchaEl.value, 10) === state.captchaAnswer;
    captchaEl.classList.toggle('is-invalid', !captchaOk);
    if (!captchaOk) valid = false;

    if (!valid) return;

    var quizLines = ['Aandoening: ' + state.ailmentNaam].concat(
      Object.entries(state.answers).map(function (e) { return e[0] + ': ' + e[1]; })
    ).join('\n');

    var body = [
      'Naam: ' + document.getElementById('ailmentNaamInput').value,
      'Email: ' + document.getElementById('ailmentEmailInput').value,
      'Telefoon: ' + document.getElementById('ailmentTelInput').value,
      'Gewenste datum: ' + document.getElementById('ailmentDatumInput').value,
      '',
      'Klachtenanalyse:',
      quizLines,
      '',
      'Opmerkingen: ' + document.getElementById('ailmentOpmerkingen').value,
    ].join('\n');

    window.location.href = 'mailto:info@voetselect.nl?subject=' + encodeURIComponent('Afspraakverzoek – ' + state.ailmentNaam + ' – ' + document.getElementById('ailmentNaamInput').value) + '&body=' + encodeURIComponent(body);
    showStep('ailmentSuccess');
  });
}());

// Contact form
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  let captchaAnswer = 0;

  function generateCaptcha() {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    captchaAnswer = a + b;
    document.getElementById('contactCaptchaQ').textContent = `Wat is ${a} + ${b}?`;
    document.getElementById('contactCaptcha').value = '';
    document.getElementById('contactCaptcha').classList.remove('is-invalid');
  }

  generateCaptcha();

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    ['contactNaam', 'contactEmail', 'contactBericht'].forEach(id => {
      const el = document.getElementById(id);
      const ok = el.value.trim() !== '';
      el.classList.toggle('is-invalid', !ok);
      if (!ok) valid = false;
    });

    const captchaEl = document.getElementById('contactCaptcha');
    const captchaOk = parseInt(captchaEl.value, 10) === captchaAnswer;
    captchaEl.classList.toggle('is-invalid', !captchaOk);
    if (!captchaOk) valid = false;

    if (!valid) return;

    const naam    = document.getElementById('contactNaam').value;
    const email   = document.getElementById('contactEmail').value;
    const tel     = document.getElementById('contactTel').value;
    const bericht = document.getElementById('contactBericht').value;

    const body = `Naam: ${naam}\nEmail: ${email}\nTelefoon: ${tel}\n\nBericht:\n${bericht}`;
    window.location.href = `mailto:info@voetselect.nl?subject=${encodeURIComponent('Contactformulier – ' + naam)}&body=${encodeURIComponent(body)}`;

    form.style.display = 'none';
    document.getElementById('contactSuccess').style.display = 'block';
  });
}());
