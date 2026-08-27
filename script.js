/* Form backend: https://web3forms.com — free, no server required.
   Get your own access key at web3forms.com and paste it below. */
const WEB3FORMS_ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

function submitForm(form, errorEl, fields, onSuccess) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalLabel = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Bezig met verzenden...';
  if (errorEl) errorEl.hidden = true;

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(Object.assign({ access_key: WEB3FORMS_ACCESS_KEY }, fields)),
  })
    .then(res => res.json())
    .then(data => {
      if (!data.success) throw new Error(data.message || 'Verzenden mislukt');
      onSuccess();
    })
    .catch(() => {
      if (errorEl) errorEl.hidden = false;
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    });
}

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
  // Lets other features (e.g. the vergoeding-check result screen) open this
  // quiz after first closing their own overlay, instead of both being open
  // at once (which silently stacks two same-z-index overlays on top of
  // each other and makes the newly-opened one unreachable).
  document.addEventListener('openAppointmentQuiz', openQuiz);

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

    submitForm(form, document.getElementById('appointmentFormError'), {
      subject: 'Afspraakverzoek – ' + form.naam.value,
      naam: form.naam.value,
      email: form.email.value,
      telefoon: form.telefoon.value,
      datum: form.datum.value,
      klachtenanalyse: quizLines,
      opmerkingen: form.opmerkingen.value,
    }, () => showStep('quizSuccess'));
  });
}());

// Vergoeding check
(function () {
  const overlay = document.getElementById('vergoedingOverlay');
  if (!overlay) return;

  // VERGOEDING_PLANS en INSURER_LINKS komen uit verzekeraars-data.js

  // Guards against a javascript:/data: URL ending up in an href — these values
  // come from an LLM's web research, not a hand-typed source.
  function isSafeHttpUrl(link) {
    try {
      const u = new URL(link.url, window.location.href);
      return u.protocol === 'https:' || u.protocol === 'http:';
    } catch (e) {
      return false;
    }
  }

  let selectedInsurer = '';
  let cameFromStep2 = false;

  function showStep(id) {
    overlay.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('is-active'));
    document.getElementById(id).classList.add('is-active');
    overlay.querySelector('.quiz-modal').scrollTop = 0;
  }

  function open() {
    selectedInsurer = '';
    cameFromStep2 = false;
    overlay.querySelectorAll('#vergStep1 .quiz-option').forEach(b => b.classList.remove('is-selected'));
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

  function showResult(plan) {
    document.getElementById('vergResultInsurer').textContent = selectedInsurer;
    const planEl = document.querySelector('#vergResultAmount .verg-amount-plan');
    const valueEl = document.querySelector('#vergResultAmount .verg-amount-value');

    if (plan) {
      planEl.textContent = plan.naam;
      valueEl.textContent = plan.bedrag;
    } else {
      const links = (INSURER_LINKS[selectedInsurer] || []).filter(isSafeHttpUrl);
      planEl.textContent = 'Pakket onbekend';
      if (links.length) {
        valueEl.textContent = '';
        valueEl.append('Bel ons gerust, dan zoeken wij dit voor u uit. U kunt uw persoonlijke vergoeding ook bekijken op de website van uw verzekeraar: ');
        links.forEach((l, i) => {
          if (i > 0) valueEl.append(' of ');
          const a = document.createElement('a');
          a.href = l.url;
          a.target = '_blank';
          a.rel = 'noopener';
          a.textContent = l.label;
          valueEl.append(a);
        });
        valueEl.append('.');
      } else {
        valueEl.textContent = 'Bel ons gerust, dan zoeken wij dit graag voor u uit, of raadpleeg uw eigen zorgverzekeraar.';
      }
    }
    showStep('vergResult');
  }

  document.getElementById('vergNextBtn').addEventListener('click', () => {
    const plans = VERGOEDING_PLANS[selectedInsurer];
    if (plans && plans.length) {
      cameFromStep2 = true;
      document.getElementById('vergStep2Insurer').textContent = selectedInsurer;
      const select = document.getElementById('vergPakketSelect');
      select.textContent = '';
      plans.forEach((plan, i) => {
        const opt = document.createElement('option');
        opt.value = String(i);
        opt.textContent = plan.naam;
        select.appendChild(opt);
      });
      const unknownOpt = document.createElement('option');
      unknownOpt.value = 'weet-niet';
      unknownOpt.textContent = 'Ik weet mijn pakket niet';
      select.appendChild(unknownOpt);
      showStep('vergStep2');
    } else {
      cameFromStep2 = false;
      showResult(null);
    }
  });

  document.getElementById('vergStep2BackBtn').addEventListener('click', () => showStep('vergStep1'));

  document.getElementById('vergStep2NextBtn').addEventListener('click', () => {
    const select = document.getElementById('vergPakketSelect');
    const plans = VERGOEDING_PLANS[selectedInsurer] || [];
    if (select.value === 'weet-niet') {
      showResult(null);
    } else {
      showResult(plans[parseInt(select.value, 10)]);
    }
  });

  document.getElementById('vergBackBtn').addEventListener('click', () => {
    showStep(cameFromStep2 ? 'vergStep2' : 'vergStep1');
  });

  // The result screen's own "Maak een afspraak" link must close this overlay
  // before opening the appointment quiz — both overlays share the same
  // z-index, so leaving this one open makes the quiz open invisibly
  // underneath it, and the button looks like it does nothing.
  const vergResultAfspraakBtn = document.getElementById('vergResultAfspraakBtn');
  if (vergResultAfspraakBtn) {
    vergResultAfspraakBtn.addEventListener('click', (e) => {
      e.preventDefault();
      close();
      document.dispatchEvent(new Event('openAppointmentQuiz'));
    });
  }
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

    var naam = document.getElementById('ailmentNaamInput').value;

    submitForm(form, document.getElementById('ailmentFormError'), {
      subject: 'Afspraakverzoek – ' + state.ailmentNaam + ' – ' + naam,
      aandoening: state.ailmentNaam,
      naam: naam,
      email: document.getElementById('ailmentEmailInput').value,
      telefoon: document.getElementById('ailmentTelInput').value,
      datum: document.getElementById('ailmentDatumInput').value,
      klachtenanalyse: quizLines,
      opmerkingen: document.getElementById('ailmentOpmerkingen').value,
    }, function () { showStep('ailmentSuccess'); });
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

    submitForm(form, document.getElementById('contactFormError'), {
      subject: 'Contactformulier – ' + naam,
      naam: naam,
      email: email,
      telefoon: tel,
      bericht: bericht,
    }, () => {
      form.style.display = 'none';
      document.getElementById('contactSuccess').style.display = 'block';
    });
  });
}());

// Maatslipper shelf lightbox
(function () {
  const lightbox = document.getElementById('slipperLightbox');
  if (!lightbox) return;

  const img = document.getElementById('slipperLightboxImg');
  const closeBtn = document.getElementById('slipperLightboxClose');
  let lastTrigger = null;

  function open(trigger) {
    lastTrigger = trigger;
    img.src = trigger.dataset.full;
    img.alt = trigger.dataset.alt || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
    if (lastTrigger) lastTrigger.focus();
  }

  document.querySelectorAll('.maatslipper-shelf-item[data-full]').forEach(btn => {
    btn.addEventListener('click', () => open(btn));
  });

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) close();
  });
}());

// FAQ answer bubble modal
(function () {
  const overlay = document.getElementById('faqOverlay');
  if (!overlay) return;

  const questionEl = document.getElementById('faqModalQuestion');
  const answerEl = document.getElementById('faqModalAnswer');
  let lastTrigger = null;

  function open(btn) {
    lastTrigger = btn;
    questionEl.textContent = btn.textContent.trim();
    answerEl.textContent = btn.dataset.answer || '';
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
  }

  function close() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
    if (lastTrigger) lastTrigger.focus();
  }

  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => open(btn));
  });

  document.getElementById('faqClose').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
  });
}());
