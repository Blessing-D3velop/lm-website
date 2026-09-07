/* ============================================================
   LM PAINTING, TILING & WATERPROOFING — main.js
   Mobile nav, scroll reveal, WhatsApp links, quote form
   ============================================================ */

(function () {
  "use strict";

  var WHATSAPP_NUMBER = "27720396483"; // 072 039 6483 in international format
  var DEFAULT_MESSAGE =
    "Hi Lawrence, I would like to enquire about your painting, tiling, waterproofing or bathroom renovation services.";

  function buildWhatsAppLink(message) {
    var text = encodeURIComponent(message || DEFAULT_MESSAGE);
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text;
  }

  function wireWhatsAppLinks() {
    var links = document.querySelectorAll("[data-whatsapp]");
    links.forEach(function (link) {
      var customMsg = link.getAttribute("data-whatsapp-message");
      link.setAttribute("href", buildWhatsAppLink(customMsg));
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
  }

  /* ---------------- Mobile navigation drawer ---------------- */
  function initMobileNav() {
    var hamburger = document.querySelector(".hamburger");
    var drawer = document.querySelector(".mobile-drawer");
    var scrim = document.querySelector(".scrim");
    var closeBtn = document.querySelector(".mobile-drawer-close");
    if (!hamburger || !drawer || !scrim) return;

    function openDrawer() {
      drawer.classList.add("open");
      scrim.classList.add("open");
      hamburger.classList.add("active");
      hamburger.setAttribute("aria-expanded", "true");
      document.body.classList.add("no-scroll");
    }
    function closeDrawer() {
      drawer.classList.remove("open");
      scrim.classList.remove("open");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
    }

    hamburger.addEventListener("click", function () {
      if (drawer.classList.contains("open")) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
    scrim.addEventListener("click", closeDrawer);
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    drawer.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeDrawer);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer();
    });
  }

  /* ---------------- Header shadow on scroll ---------------- */
  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    function onScroll() {
      if (window.scrollY > 12) {
        header.style.boxShadow = "0 12px 30px -18px rgba(0,0,0,0.5)";
      } else {
        header.style.boxShadow = "none";
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------------- Scroll reveal ---------------- */
  function initScrollReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in-view"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------------- Stagger reveal delay for grids ---------------- */
  function initStaggers() {
    document.querySelectorAll("[data-stagger]").forEach(function (group) {
      var children = group.children;
      for (var i = 0; i < children.length; i++) {
        children[i].classList.add("reveal");
        children[i].style.transitionDelay = i * 90 + "ms";
      }
    });
  }

  /* ---------------- Quote form (front-end only) ---------------- */
  function initQuoteForm() {
    var form = document.querySelector("#quoteForm");
    if (!form) return;
    var successBox = document.querySelector("#formSuccess");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.querySelector("#name").value.trim();
      var phone = form.querySelector("#phone").value.trim();
      var service = form.querySelector("#service").value;
      var message = form.querySelector("#message").value.trim();

      var waMessage =
        "Hi Lawrence, my name is " + name + ". " +
        "I'd like a quote for " + service + ". " +
        (message ? "Details: " + message + " " : "") +
        "You can reach me on " + phone + ".";

      if (successBox) {
        successBox.classList.add("show");
        successBox.setAttribute("tabindex", "-1");
        successBox.focus();
      }

      // Open WhatsApp with the pre-filled enquiry so Lawrence receives it directly.
      window.open(buildWhatsAppLink(waMessage), "_blank", "noopener,noreferrer");

      form.reset();
    });
  }

  /* ---------------- Active nav link ---------------- */
  function markActiveNav() {
    var path = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a, .mobile-drawer a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (href === path || (path === "" && href === "index.html")) {
        a.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------------- Footer year ---------------- */
  function setYear() {
    var el = document.querySelector("#year");
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", function () {
    wireWhatsAppLinks();
    initMobileNav();
    initHeaderScroll();
    initStaggers();
    initScrollReveal();
    initQuoteForm();
    markActiveNav();
    setYear();
  });
})();
