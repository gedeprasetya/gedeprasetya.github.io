(function () {
  "use strict";

  /* ── Scroll reveal ── */
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          revealObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.07, rootMargin: "0px 0px -28px 0px" },
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

  /* ── Nav scroll style ── */
  const nav = document.getElementById("nav");
  window.addEventListener(
    "scroll",
    () => {
      nav.classList.toggle("scrolled", window.scrollY > 24);
    },
    { passive: true },
  );

  /* ── Active nav link (scroll spy) ── */
  const sectionIds = ["problem", "solution", "services", "why", "cta"];
  const navAnchors = document.querySelectorAll(".nav-links a[data-section]");
  const spyObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          navAnchors.forEach((a) => a.classList.remove("active"));
          const match = document.querySelector(
            `.nav-links a[data-section="${e.target.id}"]`,
          );
          if (match) match.classList.add("active");
        }
      });
    },
    { rootMargin: "-38% 0px -52% 0px" },
  );
  sectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) spyObs.observe(el);
  });

  /* ── Mobile menu ── */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuOverlay = document.getElementById("menuOverlay");

  function openMenu() {
    hamburger.classList.add("open");
    hamburger.setAttribute("aria-expanded", "true");
    mobileMenu.classList.add("open");
    menuOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("open");
    menuOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  hamburger.addEventListener("click", () => {
    hamburger.classList.contains("open") ? closeMenu() : openMenu();
  });
  menuOverlay.addEventListener("click", closeMenu);
  document
    .querySelectorAll(".mob-link")
    .forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* ── Smooth scroll for internal anchors ── */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH =
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--nav-h",
          ),
        ) || 68;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  /* ── Back to top & float group visibility ── */
  const backToTop = document.getElementById("backToTop");
  window.addEventListener(
    "scroll",
    () => {
      backToTop.classList.toggle("visible", window.scrollY > 400);
    },
    { passive: true },
  );
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ── Custom cursor (desktop only) ── */
  const cursor = document.getElementById("cursor");
  if (window.matchMedia("(hover: hover)").matches) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.width = "28px";
        cursor.style.height = "28px";
        cursor.style.background = "transparent";
        cursor.style.border = "1.5px solid var(--accent)";
      });
      el.addEventListener("mouseleave", () => {
        cursor.style.width = "6px";
        cursor.style.height = "6px";
        cursor.style.background = "var(--accent)";
        cursor.style.border = "none";
      });
    });
  }
})();
