/* ============================================================
   Emmanuel Djegou — Portfolio JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ============================================================
     1. Mobile Nav Toggle
     ============================================================ */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('nav-open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('nav-open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on nav link click (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('nav-open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ============================================================
     2. Active Nav Link
     ============================================================ */
  function setActiveNavLink() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-links a').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === filename || (filename === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  setActiveNavLink();

  /* ============================================================
     3. Scroll Reveal (IntersectionObserver)
     ============================================================ */
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ============================================================
     4. Typing Animation
     ============================================================ */
  const typingEl = document.getElementById('typing-text');

  if (typingEl) {
    const phrases = [
      'Statistics PhD Candidate',
      'Survival Analysis Researcher',
      'Deep Learning for Time-to-Event Data',
      'Data Scientist & Industry Researcher'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function typeChar() {
      const currentPhrase = phrases[phraseIndex];

      if (isPaused) {
        isPaused = false;
        isDeleting = true;
        setTimeout(typeChar, 80);
        return;
      }

      if (!isDeleting) {
        typingEl.textContent = currentPhrase.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentPhrase.length) {
          isPaused = true;
          setTimeout(typeChar, 2000);
          return;
        }
        setTimeout(typeChar, 80);
      } else {
        typingEl.textContent = currentPhrase.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(typeChar, 400);
          return;
        }
        setTimeout(typeChar, 45);
      }
    }

    setTimeout(typeChar, 600);
  }

  /* ============================================================
     5. Smooth Page Transitions
     ============================================================ */
  document.querySelectorAll('a[href]').forEach(function (link) {
    const href = link.getAttribute('href');
    // Only handle internal HTML page links
    if (
      href &&
      !href.startsWith('#') &&
      !href.startsWith('http') &&
      !href.startsWith('mailto') &&
      !href.startsWith('tel') &&
      !link.hasAttribute('download') &&
      (href.endsWith('.html') || href === '/')
    ) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = href;
        document.body.classList.add('fade-out');
        setTimeout(function () {
          window.location.href = target;
        }, 300);
      });
    }
  });

  /* ============================================================
     6. Nav Scroll Behavior
     ============================================================ */
  const navbar = document.querySelector('.navbar');

  if (navbar) {
    function handleNavScroll() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();
  }

  /* ============================================================
     7. Contact Form (preventDefault — no backend needed for static)
     ============================================================ */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = (contactForm.querySelector('#name') || {}).value || '';
      const email = (contactForm.querySelector('#email') || {}).value || '';
      const subject = (contactForm.querySelector('#subject') || {}).value || 'Message from Portfolio';
      const message = (contactForm.querySelector('#message') || {}).value || '';

      const body = encodeURIComponent(
        'From: ' + name + ' <' + email + '>\n\n' + message
      );
      const mailtoLink = 'mailto:emmanueldjegou5@gmail.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + body;

      window.location.href = mailtoLink;

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Opening Mail Client...';
      btn.disabled = true;
      setTimeout(function () {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 3000);
    });
  }

})();
