/* ============================================================
   LM PAINTING, TILING & WATERPROOFING — gallery.js
   Dynamically builds the 25-image grid and powers the lightbox.
   Drop real project photos into images/gallery/ named
   image-1.jpeg ... image-25.jpeg — no other code changes needed.
   ============================================================ */

(function () {
  "use strict";

  var GALLERY_COUNT = 25;
  var GALLERY_PATH = "images/gallery/";
  var GALLERY_EXT = ".jpeg";

  var GALLERY_CAPTIONS = [
    "Interior Painting", "Exterior Painting", "Wall Preparation & Finish", "Commercial Painting Project",
    "Floor Tiling", "Wall Tiling", "Bathroom Tiling", "Kitchen Tiling",
    "Roof Waterproofing", "Wall Waterproofing", "Leak Repair", "Damp Proofing",
    "Bathroom Makeover", "Shower Renovation", "Vanity Installation", "Modern Bathroom Finish",
    "Precision Tile Detailing", "Paint Finish Detail", "Site Progress", "Before & After Result",
    "Tile Detailing", "Feature Wall Finish", "Waterproof Membrane Application", "Renovation Project",
    "Completed Project"
  ];

  function buildGalleryData() {
    var items = [];
    for (var i = 1; i <= GALLERY_COUNT; i++) {
      items.push({
        src: GALLERY_PATH + "image-" + i + GALLERY_EXT,
        caption: GALLERY_CAPTIONS[i - 1] || "Project " + i,
        index: i
      });
    }
    return items;
  }

  function renderGalleryGrid(gridEl, items) {
    var frag = document.createDocumentFragment();
    items.forEach(function (item, idx) {
      var cell = document.createElement("div");
      cell.className = "gallery-item reveal";
      cell.style.transitionDelay = (idx % 8) * 60 + "ms";
      cell.setAttribute("role", "button");
      cell.setAttribute("tabindex", "0");
      cell.setAttribute("aria-label", "Open image " + item.index + " of " + items.length + ": " + item.caption);
      cell.dataset.index = idx;

      var img = document.createElement("img");
      img.src = item.src;
      img.alt = item.caption + " — LM Painting, Tiling & Waterproofing project photo";
      img.loading = "lazy";
      img.onerror = function () {
        cell.style.display = "none";
      };

      var overlay = document.createElement("div");
      overlay.className = "gallery-overlay";
      var span = document.createElement("span");
      span.textContent = item.caption;
      overlay.appendChild(span);

      cell.appendChild(img);
      cell.appendChild(overlay);
      frag.appendChild(cell);
    });
    gridEl.appendChild(frag);
  }

  function initLightbox(items) {
    var lightbox = document.querySelector("#lightbox");
    if (!lightbox) return null;

    var imgEl = lightbox.querySelector(".lightbox-img");
    var counterEl = lightbox.querySelector(".lightbox-counter");
    var closeBtn = lightbox.querySelector(".lightbox-close");
    var prevBtn = lightbox.querySelector(".lightbox-prev");
    var nextBtn = lightbox.querySelector(".lightbox-next");

    var currentIndex = 0;

    function show(index) {
      currentIndex = (index + items.length) % items.length;
      var item = items[currentIndex];
      imgEl.classList.remove("show");
      // brief fade for a smooth transition between images
      window.setTimeout(function () {
        imgEl.src = item.src;
        imgEl.alt = item.caption;
        imgEl.classList.add("show");
      }, 90);
      counterEl.textContent = (currentIndex + 1) + " / " + items.length;
    }

    function open(index) {
      show(index);
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("no-scroll");
      closeBtn.focus();
    }

    function close() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.classList.remove("no-scroll");
    }

    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", function () { show(currentIndex - 1); });
    nextBtn.addEventListener("click", function () { show(currentIndex + 1); });

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(currentIndex - 1);
      if (e.key === "ArrowRight") show(currentIndex + 1);
    });

    return { open: open };
  }

  function wireGridClicks(gridEl, lightboxController) {
    if (!lightboxController) return;
    gridEl.addEventListener("click", function (e) {
      var cell = e.target.closest(".gallery-item");
      if (!cell) return;
      lightboxController.open(parseInt(cell.dataset.index, 10));
    });
    gridEl.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var cell = e.target.closest(".gallery-item");
      if (!cell) return;
      e.preventDefault();
      lightboxController.open(parseInt(cell.dataset.index, 10));
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var gridEl = document.querySelector("#galleryGrid");
    if (!gridEl) return;

    var limitAttr = gridEl.getAttribute("data-limit");
    var allItems = buildGalleryData();
    var visibleItems = limitAttr ? allItems.slice(0, parseInt(limitAttr, 10)) : allItems;

    renderGalleryGrid(gridEl, visibleItems);

    // The lightbox always cycles through the FULL 25-image set,
    // even when the grid on this page only shows a preview.
    var lightboxController = initLightbox(allItems);
    wireGridClicks(gridEl, lightboxController);

    if (window.IntersectionObserver) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      gridEl.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });
    } else {
      gridEl.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in-view"); });
    }
  });
})();
