document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('primaryNav');
  const navLinks = nav.querySelectorAll('a');

  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open);
    document.body.classList.toggle('menu-open', open && window.innerWidth < 1000);

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

  // Close the menu after choosing a link (mobile overlay)
  navLinks.forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
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

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
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

  const state = { answers: {} };

  function showStep(id) {
    overlay.querySelectorAll('.quiz-step').forEach(s => s.classList.remove('is-active'));
    document.getElementById(id).classList.add('is-active');
    if (id === 'quizForm') buildSummary();
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
