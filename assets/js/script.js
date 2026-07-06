(function () {
  const root = document.documentElement;
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('#nav-links');
  const themeToggle = document.querySelector('.theme-toggle');
  const year = document.querySelector('#year');

  if (year) year.textContent = new Date().getFullYear();

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navLinks.classList.toggle('show', !isOpen);
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function preferredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      if (themeToggle) themeToggle.textContent = 'Light';
    } else {
      root.removeAttribute('data-theme');
      if (themeToggle) themeToggle.textContent = 'Dark';
    }
  }

  applyTheme(preferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      applyTheme(next);
    });
  }
})();
