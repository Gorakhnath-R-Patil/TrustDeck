/**
 * TrustDesk — Main JavaScript
 * trustdesk.in
 * Author: Gorakhnath Patil
 */

'use strict';

/* ── UTILITIES ───────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const debounce = (fn, ms = 100) => {
  let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
};

/* ── NAV ─────────────────────────────────────────────────── */
const NavController = (() => {
  const nav      = $('#nav');
  const hamburger = $('.nav-hamburger');
  const mobileMenu = $('.nav-mobile');
  const progress = $('.nav-progress');
  let   open     = false;

  function updateScroll() {
    const scrolled = window.scrollY > 20;
    nav.classList.toggle('scrolled', scrolled);

    // Reading progress bar
    if (progress) {
      const total  = document.documentElement.scrollHeight - window.innerHeight;
      const pct    = total > 0 ? (window.scrollY / total) * 100 : 0;
      progress.style.width = pct + '%';
    }

    // Active link highlighting
    const sections = $$('section[id]');
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    $$('.nav-links a').forEach(a => {
      const href = a.getAttribute('href')?.slice(1);
      a.classList.toggle('active', href === current);
    });
  }

  function toggleMenu() {
    open = !open;
    hamburger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  function init() {
    if (!nav) return;
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    if (hamburger) hamburger.addEventListener('click', toggleMenu);

    // Close mobile menu on link click
    $$('.nav-mobile a').forEach(a => {
      a.addEventListener('click', () => {
        if (open) toggleMenu();
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (open && !nav.contains(e.target)) toggleMenu();
    });
  }

  return { init };
})();

/* ── SMOOTH SCROLL ───────────────────────────────────────── */
const SmoothScroll = (() => {
  function init() {
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }
  return { init };
})();

/* ── SCROLL REVEAL ───────────────────────────────────────── */
const RevealController = (() => {
  let observer;

  function init() {
    if (!('IntersectionObserver' in window)) {
      $$('.reveal').forEach(el => el.classList.add('revealed'));
      return;
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    $$('.reveal').forEach(el => observer.observe(el));
  }

  return { init };
})();

/* ── BACK TO TOP ─────────────────────────────────────────── */
const BackToTop = (() => {
  function init() {
    const btn = $('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', debounce(() => {
      btn.classList.toggle('visible', window.scrollY > 600);
    }, 50), { passive: true });

    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
  return { init };
})();

/* ── PORTFOLIO FILTER ────────────────────────────────────── */
const PortfolioFilter = (() => {
  function init() {
    const filterBtns = $$('.filter-btn');
    const appCards   = $$('.app-card');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update button states
        filterBtns.forEach(b => b.classList.toggle('active', b === btn));

        // Filter cards with animation
        appCards.forEach((card, i) => {
          const platform = card.dataset.platform;
          const match    = filter === 'all' || platform === filter;

          if (match) {
            card.removeAttribute('data-hidden');
            card.style.animationDelay = (i % 8) * 0.04 + 's';
            card.style.animation = 'none';
            requestAnimationFrame(() => {
              card.style.animation = 'cardReveal 0.4s var(--t-slow) both';
            });
          } else {
            card.dataset.hidden = 'true';
          }
        });
      });
    });
  }
  return { init };
})();

/* ── COUNTER ANIMATION ───────────────────────────────────── */
const CounterAnimation = (() => {
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease out
      const current = Math.round(eased * target);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  function init() {
    const counters = $$('[data-target]');
    if (!counters.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  return { init };
})();

/* ── CONTACT FORM ────────────────────────────────────────── */
const ContactForm = (() => {
  function init() {
    const form = $('#contact-form');
    if (!form) return;

    form.addEventListener('submit', e => {
      e.preventDefault();

      const btn = form.querySelector('[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Simulate async (replace with real fetch in production)
      setTimeout(() => {
        btn.textContent = '✓ Message Sent!';
        btn.style.background = 'var(--green-700)';
        form.reset();
        setTimeout(() => {
          btn.textContent = original;
          btn.style.background = '';
          btn.disabled = false;
        }, 4000);
      }, 1200);
    });
  }

  return { init };
})();

/* ── COOKIE NOTICE ───────────────────────────────────────── */
const CookieNotice = (() => {
  function init() {
    const notice = $('.cookie-notice');
    const btn    = $('.cookie-accept');
    if (!notice) return;
    if (localStorage.getItem('td_cookie_ok')) return;

    setTimeout(() => notice.classList.add('visible'), 2000);

    btn?.addEventListener('click', () => {
      notice.classList.remove('visible');
      localStorage.setItem('td_cookie_ok', '1');
    });
  }
  return { init };
})();

/* ── TYPED EFFECT ────────────────────────────────────────── */
const TypedEffect = (() => {
  function init() {
    const el = $('.hero-typed');
    if (!el) return;

    const words = ['Inventory', 'Billing', 'CRM', 'Payroll', 'Retail POS', 'Clinic'];
    let wi = 0, ci = 0, deleting = false;

    function type() {
      const word = words[wi];

      if (!deleting) {
        el.textContent = word.slice(0, ++ci);
        if (ci === word.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
        setTimeout(type, 90);
      } else {
        el.textContent = word.slice(0, --ci);
        if (ci === 0) {
          deleting = false;
          wi = (wi + 1) % words.length;
          setTimeout(type, 300);
          return;
        }
        setTimeout(type, 50);
      }
    }

    type();
  }

  return { init };
})();

/* ── SECURITY SECTION HOVER ──────────────────────────────── */
const SecurityHover = (() => {
  function init() {
    $$('.sec-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        $$('.sec-item').forEach(i => {
          i.style.opacity = i === item ? '1' : '0.5';
        });
      });
      item.addEventListener('mouseleave', () => {
        $$('.sec-item').forEach(i => { i.style.opacity = '1'; });
      });
    });
  }
  return { init };
})();

/* ── PRELOADER ───────────────────────────────────────────── */
const Preloader = (() => {
  function init() {
    const loader = $('#preloader');
    if (!loader) return;
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
        setTimeout(() => loader.remove(), 500);
      }, 300);
    });
  }
  return { init };
})();

/* ── CARD ANIMATIONS ─────────────────────────────────────── */
function injectCardAnimations() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes cardReveal {
      from { opacity: 0; transform: translateY(16px) scale(0.97); }
      to   { opacity: 1; transform: none; }
    }
  `;
  document.head.appendChild(style);
}

/* ── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  injectCardAnimations();
  NavController.init();
  SmoothScroll.init();
  RevealController.init();
  BackToTop.init();
  PortfolioFilter.init();
  CounterAnimation.init();
  ContactForm.init();
  CookieNotice.init();
  TypedEffect.init();
  SecurityHover.init();
  Preloader.init();

  // Log build info (dev)
  console.info('%cTrustDesk', 'color:#1f4fd8;font-size:1.5rem;font-weight:800;', '\nPrivacy-first offline business software\nhttps://trustdesk.in');
});
