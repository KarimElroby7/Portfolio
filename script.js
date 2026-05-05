/* ============================================================
   Karim Elroby — Portfolio JS
   - Sticky nav state
   - Mobile menu
   - Scroll-spy active link
   - Hero typing effect
   - Stats counter animation
   - Skill bar fill on scroll
   - Reveal-on-scroll
   - Project card cursor spotlight
   - Profile-photo fallback to gradient initials
   - Footer year
   ============================================================ */

(() => {
  "use strict";

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Footer year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Profile photo: fallback to initials if image fails ---------- */
  const heroPhoto = $("#heroPhoto");
  if (heroPhoto) {
    const markFallback = () => {
      const frame = heroPhoto.closest(".photo__frame");
      if (frame) frame.classList.add("no-image");
    };
    if (heroPhoto.complete && heroPhoto.naturalWidth === 0) markFallback();
    heroPhoto.addEventListener("error", markFallback, { once: true });
  }

  /* ---------- Sticky nav: shadow / border once user scrolls ---------- */
  const nav = $("#nav");
  const onScroll = () => {
    if (window.scrollY > 16) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu toggle ---------- */
  const navToggle = $("#navToggle");
  const navMenu   = $("#navMenu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const open = navMenu.classList.toggle("open");
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navMenu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navMenu.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Scroll-spy: highlight active section ---------- */
  const sections = $$("main section[id]");
  const navLinks = $$("#navMenu a[href^='#']");
  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Hero typing effect ---------- */
  const typed = $("#typed");
  if (typed) {
    const phrases = [
      "AI Engineer.",
      "Computer Vision Specialist.",
      "Generative-AI Builder.",
      "Real-Time Systems Engineer.",
    ];
    let pIdx = 0, cIdx = 0, deleting = false;

    const tick = () => {
      const word = phrases[pIdx];
      typed.textContent = deleting ? word.slice(0, --cIdx) : word.slice(0, ++cIdx);

      let delay = deleting ? 35 : 75;

      if (!deleting && cIdx === word.length) {
        delay = 1700;
        deleting = true;
      } else if (deleting && cIdx === 0) {
        deleting = false;
        pIdx = (pIdx + 1) % phrases.length;
        delay = 240;
      }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 600);
  }

  /* ---------- Stats counter animation ---------- */
  const counters = $$(".hero__statValue");
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    if (Number.isNaN(target)) return;
    const duration = 1400;
    const start = performance.now();
    const startVal = 0;

    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(startVal + (target - startVal) * eased);
      el.textContent = value.toLocaleString();
      if (t < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    };
    requestAnimationFrame(step);
  };

  if ("IntersectionObserver" in window && counters.length) {
    const counterObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            counterObs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => counterObs.observe(c));
  } else {
    counters.forEach((c) => (c.textContent = c.dataset.count));
  }

  /* ---------- Reveal-on-scroll ---------- */
  const revealTargets = $$(
    ".section__head, .about__copy, .skill, .project, .service, .contact, .about__highlights li"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            reveal.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach((el) => reveal.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("visible"));
  }

  /* ---------- Project card cursor-tracked spotlight ---------- */
  $$(".project").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--x", `${x}%`);
      card.style.setProperty("--y", `${y}%`);
    });
  });
})();
