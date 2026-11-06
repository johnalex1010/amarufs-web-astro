(function () {
  const body = document.body;
  const gallery = document.querySelector("[data-property-gallery]");
  const galleryMain = document.querySelector("[data-gallery-main]");
  const galleryThumbs = Array.from(document.querySelectorAll("[data-gallery-thumb]"));
  const galleryCount = document.querySelector("[data-gallery-count]");
  const galleryPrev = document.querySelector("[data-gallery-prev]");
  const galleryNext = document.querySelector("[data-gallery-next]");
  const galleryOpen = document.querySelector("[data-gallery-open]");
  const galleryModal = document.querySelector("[data-gallery-modal]");
  const galleryModalImage = document.querySelector("[data-gallery-modal-image]");
  const galleryModalCount = document.querySelector("[data-modal-count]");
  const galleryModalPrev = document.querySelector("[data-modal-prev]");
  const galleryModalNext = document.querySelector("[data-modal-next]");
  const galleryClose = document.querySelector("[data-gallery-close]");
  let currentGalleryIndex = 0;
  const preloadedSlides = new Set();

  function isGalleryModalOpen() {
    return Boolean(galleryModal && !galleryModal.hidden);
  }

  // Descarga en segundo plano una foto vecina para que el cambio de slide sea inmediato.
  function preloadSlide(index, forModal) {
    if (!galleryThumbs.length) {
      return;
    }

    const slideIndex = (index + galleryThumbs.length) % galleryThumbs.length;
    const key = `${forModal ? "modal" : "main"}-${slideIndex}`;
    const thumb = galleryThumbs[slideIndex];

    if (!thumb || preloadedSlides.has(key)) {
      return;
    }

    preloadedSlides.add(key);
    const image = new Image();
    image.decoding = "async";

    if (forModal) {
      image.src = thumb.dataset.galleryModalSrc || thumb.dataset.gallerySrc || "";
      return image;
    }

    if (thumb.dataset.gallerySrcset && galleryMain) {
      image.sizes = galleryMain.getAttribute("sizes") || "";
      image.srcset = thumb.dataset.gallerySrcset;
    }

    image.src = thumb.dataset.gallerySrc || "";
    return image;
  }

  // Tras la carga inicial, descarga el resto de la galería de a una foto (son ~30-60 KB
  // cada una) para que cualquier slide se vea al instante. Respeta el ahorro de datos.
  function preloadWholeGallery() {
    const connection = navigator.connection;

    if (connection && (connection.saveData || /2g/.test(connection.effectiveType || ""))) {
      return;
    }

    let nextIndex = 0;

    function loadNext() {
      while (nextIndex < galleryThumbs.length && preloadedSlides.has(`main-${nextIndex}`)) {
        nextIndex += 1;
      }

      if (nextIndex >= galleryThumbs.length) {
        return;
      }

      const image = preloadSlide(nextIndex, false);
      nextIndex += 1;

      if (image) {
        image.addEventListener("load", loadNext, { once: true });
        image.addEventListener("error", loadNext, { once: true });
      } else {
        loadNext();
      }
    }

    loadNext();
  }

  function preloadNeighbors() {
    const forModal = isGalleryModalOpen();
    preloadSlide(currentGalleryIndex + 1, forModal);
    preloadSlide(currentGalleryIndex - 1, forModal);
  }

  function syncModalImage() {
    const activeThumb = galleryThumbs[currentGalleryIndex];

    if (!galleryModalImage || !activeThumb) {
      return;
    }

    const modalSrc = activeThumb.dataset.galleryModalSrc || activeThumb.dataset.gallerySrc;

    if (modalSrc && galleryModalImage.getAttribute("src") !== modalSrc) {
      galleryModalImage.src = modalSrc;
    }

    galleryModalImage.alt = activeThumb.dataset.galleryAlt || "";
  }

  function setGalleryOpen(isOpen) {
    if (!galleryModal) {
      return;
    }

    galleryModal.hidden = !isOpen;
    body.classList.toggle("modal-open", isOpen);

    if (isOpen) {
      syncModalImage();
      preloadNeighbors();
    }

    if (isOpen) {
      galleryClose?.focus({ preventScroll: true });
    } else {
      galleryOpen?.focus({ preventScroll: true });
    }
  }

  function setActiveGalleryImage(index) {
    if (!galleryMain || !galleryThumbs.length) {
      return;
    }

    currentGalleryIndex = (index + galleryThumbs.length) % galleryThumbs.length;
    const activeThumb = galleryThumbs[currentGalleryIndex];
    const src = activeThumb.dataset.gallerySrc;
    const srcset = activeThumb.dataset.gallerySrcset;
    const alt = activeThumb.dataset.galleryAlt;

    if (galleryMain.getAttribute("src") !== src) {
      if (srcset) {
        galleryMain.srcset = srcset;
      } else {
        galleryMain.removeAttribute("srcset");
      }
      galleryMain.src = src;
    }
    galleryMain.alt = alt;

    // La imagen grande del modal solo se descarga cuando el modal está abierto.
    if (isGalleryModalOpen()) {
      syncModalImage();
    }

    if (galleryModalCount) {
      galleryModalCount.textContent = `${currentGalleryIndex + 1} / ${galleryThumbs.length}`;
    }

    if (galleryCount) {
      galleryCount.textContent = `${currentGalleryIndex + 1} / ${galleryThumbs.length}`;
    }

    galleryThumbs.forEach(function (thumb, thumbIndex) {
      const isActive = thumbIndex === currentGalleryIndex;
      thumb.classList.toggle("is-active", isActive);
      thumb.setAttribute("aria-current", isActive ? "true" : "false");
    });

    if (preloadedSlides.size || document.readyState === "complete") {
      preloadNeighbors();
    }
  }

  if (galleryOpen) {
    galleryOpen.addEventListener("click", function () {
      setGalleryOpen(true);
    });
  }

  if (gallery) {
    gallery.addEventListener("click", function (event) {
      const thumb = event.target.closest("[data-gallery-thumb]");
      if (!thumb) {
        return;
      }

      setActiveGalleryImage(galleryThumbs.indexOf(thumb));
    });
  }

  if (galleryPrev) {
    galleryPrev.addEventListener("click", function () {
      setActiveGalleryImage(currentGalleryIndex - 1);
    });
  }

  if (galleryNext) {
    galleryNext.addEventListener("click", function () {
      setActiveGalleryImage(currentGalleryIndex + 1);
    });
  }

  if (galleryModalPrev) {
    galleryModalPrev.addEventListener("click", function () {
      setActiveGalleryImage(currentGalleryIndex - 1);
    });
  }

  if (galleryModalNext) {
    galleryModalNext.addEventListener("click", function () {
      setActiveGalleryImage(currentGalleryIndex + 1);
    });
  }

  if (galleryClose) {
    galleryClose.addEventListener("click", function () {
      setGalleryOpen(false);
    });
  }

  if (galleryModal) {
    galleryModal.addEventListener("click", function (event) {
      if (event.target === galleryModal) {
        setGalleryOpen(false);
      }
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && galleryModal && !galleryModal.hidden) {
      setGalleryOpen(false);
    }

    if (!galleryModal || galleryModal.hidden) {
      return;
    }

    if (event.key === "ArrowLeft") {
      setActiveGalleryImage(currentGalleryIndex - 1);
    }

    if (event.key === "ArrowRight") {
      setActiveGalleryImage(currentGalleryIndex + 1);
    }
  });

  setActiveGalleryImage(0);

  // Precarga vecinos solo después de la carga inicial para no competir con la foto principal.
  function preloadAfterLoad() {
    preloadedSlides.add(`main-${currentGalleryIndex}`);
    preloadNeighbors();

    const schedule = window.requestIdleCallback || function (callback) {
      return window.setTimeout(callback, 300);
    };

    schedule(preloadWholeGallery);
  }

  if (document.readyState === "complete") {
    preloadAfterLoad();
  } else {
    window.addEventListener("load", preloadAfterLoad, { once: true });
  }

  galleryThumbs.forEach(function (thumb, thumbIndex) {
    thumb.addEventListener("pointerenter", function () {
      preloadSlide(thumbIndex, false);
    }, { once: true });
  });

})();
