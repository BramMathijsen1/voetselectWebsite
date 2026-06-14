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
