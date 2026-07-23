// ---- Mobile navigation ----
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.global-nav');

function closeNav() {
  hamburger.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
}

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('is-open', !isOpen);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });
}

// ---- Scroll reveal (fade-up only, lightweight) ----
const revealTargets = document.querySelectorAll('.reveal, .reveal-item');

if ('IntersectionObserver' in window && revealTargets.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
}

// ---- FAQ accordion ----
document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const answer = document.getElementById(button.getAttribute('aria-controls'));

    button.setAttribute('aria-expanded', String(!expanded));
    if (answer) answer.hidden = expanded;
  });
});

// ---- Contact form validation (front-end only) ----
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const formStatus = document.getElementById('form-status');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const fields = [
    {
      input: document.getElementById('name'),
      error: document.getElementById('name-error'),
      validate: (value) => (value.trim() ? '' : 'お名前を入力してください。'),
    },
    {
      input: document.getElementById('email'),
      error: document.getElementById('email-error'),
      validate: (value) => {
        if (!value.trim()) return 'メールアドレスを入力してください。';
        if (!emailPattern.test(value)) return 'メールアドレスの形式が正しくありません。';
        return '';
      },
    },
    {
      input: document.getElementById('message'),
      error: document.getElementById('message-error'),
      validate: (value) => (value.trim() ? '' : 'お問い合わせ内容を入力してください。'),
    },
  ];

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let hasError = false;

    fields.forEach(({ input, error, validate }) => {
      const message = validate(input.value);
      error.textContent = message;
      input.setAttribute('aria-invalid', String(Boolean(message)));
      if (message) hasError = true;
    });

    if (hasError) {
      formStatus.textContent = '入力内容をご確認ください。';
      formStatus.style.color = '#c0392b';
      return;
    }

    formStatus.style.color = '';
    formStatus.textContent = 'お問い合わせありがとうございます。内容を送信しました。';
    contactForm.reset();
  });
}
