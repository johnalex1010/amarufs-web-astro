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

  function setGalleryOpen(isOpen) {
    if (!galleryModal) {
      return;
    }

    galleryModal.hidden = !isOpen;
    body.classList.toggle("modal-open", isOpen);

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
    const alt = activeThumb.dataset.galleryAlt;

    galleryMain.src = src;
    galleryMain.alt = alt;

    if (galleryModalImage) {
      galleryModalImage.src = src;
      galleryModalImage.alt = `${alt} ampliada`;
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

})();
