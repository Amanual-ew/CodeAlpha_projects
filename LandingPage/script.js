/* ---------- 1. Hamburger menu ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

/* Close menu when a link is clicked (mobile) */
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

/* ---------- 2. Navbar background on scroll ---------- */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10, 10, 15, 0.98)';
    navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.4)';
  } else {
    navbar.style.background = 'rgba(10, 10, 15, 0.85)';
    navbar.style.boxShadow = 'none';
  }
});

/* ---------- 3. Scroll reveal ---------- */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => revealObserver.observe(el));

/* ---------- 4. Animated counters ---------- */
const stats = document.querySelectorAll('.stat h3');

const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

stats.forEach(stat => countObserver.observe(stat));

function animateCount(el) {
  const target = +el.dataset.target;
  const duration = 1500;
  const stepTime = 16;
  const steps = duration / stepTime;
  const increment = target / steps;
  let current = 0;

  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target.toLocaleString();
      clearInterval(counter);
    } else {
      el.textContent = Math.floor(current).toLocaleString();
    }
  }, stepTime);
}

/* ---------- 5. Active nav link on scroll (bonus) ---------- */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });

  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? '#ff9500' : '';
  });
});