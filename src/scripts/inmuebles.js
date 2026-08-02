(function () {
  const body = document.body;
  const listingForm = document.querySelector("[data-listing-form]");
  const filtersSidebar = document.querySelector("[data-filters-sidebar]");
  const filterToggle = document.querySelector("[data-filter-toggle]");
  const filterClose = document.querySelector("[data-filter-close]");
  const filterOverlay = document.querySelector("[data-filter-overlay]");
  const searchInput = document.querySelector("[data-search-input]");
  const filterControls = document.querySelectorAll("[data-filter]");
  const priceRange = document.querySelector("[data-price-range]");
  const priceOutput = document.querySelector("[data-price-output]");
  const clearButtons = document.querySelectorAll("[data-clear-filters]");
  const propertyGrid = document.querySelector("[data-property-grid]");
  const emptyState = document.querySelector("[data-empty-state]");
  const resultsCount = document.querySelector("[data-results-count]");
  const pagination = document.querySelector("[data-pagination]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const itemsPerPage = 6;
  let propertyCards = [];
  let currentPage = 1;
  const mobileFiltersQuery = window.matchMedia("(max-width: 760px)");

  function normalize(value) {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function formatCurrency(value) {
    return `$${Number(value).toLocaleString("es-CO")}`;
  }

  function updatePriceRange() {
    if (!priceRange || !priceOutput) {
      return;
    }

    priceOutput.textContent = formatCurrency(priceRange.value);
  }

  function setFiltersOpen(isOpen) {
    if (!filtersSidebar || !filterToggle || !filterOverlay) {
      return;
    }

    body.classList.toggle("filters-open", isOpen);
    filterToggle.setAttribute("aria-expanded", String(isOpen));
    filterToggle.setAttribute("aria-label", isOpen ? "Cerrar filtros de inmuebles" : "Abrir filtros de inmuebles");
    filterOverlay.hidden = !isOpen;

    if (isOpen) {
      filtersSidebar.focus({ preventScroll: true });
    }
  }

  function closeFiltersOnMobile() {
    if (mobileFiltersQuery.matches) {
      setFiltersOpen(false);
    }
  }

  function matchesFilter(card, filterName, selectedValue) {
    if (selectedValue === "all") {
      return true;
    }

    return normalize(card.dataset[filterName] || "").split(" ").includes(normalize(selectedValue));
  }

  function getSelectedFilters() {
    const groups = {};

    filterControls.forEach(function (control) {
      if (!control.checked) {
        return;
      }

      if (!groups[control.dataset.filter]) {
        groups[control.dataset.filter] = [];
      }

      groups[control.dataset.filter].push(control.value);
    });

    return Object.keys(groups).map(function (name) {
      const values = groups[name];
      return {
        name,
        values: values.length ? values : ["all"]
      };
    });
  }

  function updateResults() {
    const query = normalize(searchInput ? searchInput.value : "");
    const activeFilters = getSelectedFilters();
    const filteredCards = propertyCards.filter(function (card) {
      const text = normalize(card.dataset.search || card.textContent);
      const cardPrice = Number(card.dataset.price || 0);
      const maxPrice = Number(priceRange ? priceRange.value : 0);
      const matchesSearch = !query || text.includes(query);
      const matchesPrice = !maxPrice || !cardPrice || cardPrice <= maxPrice;
      const matchesAllFilters = activeFilters.every(function (filter) {
        return filter.values.includes("all") || filter.values.some(function (value) {
          return matchesFilter(card, filter.name, value);
        });
      });

      return matchesSearch && matchesPrice && matchesAllFilters;
    });
    const visibleCount = filteredCards.length;
    const totalPages = Math.max(1, Math.ceil(visibleCount / itemsPerPage));

    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    propertyCards.forEach(function (card) {
      card.hidden = true;
    });

    filteredCards.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).forEach(function (card) {
      card.hidden = false;
    });

    if (emptyState) {
      emptyState.hidden = visibleCount !== 0;
    }

    if (resultsCount) {
      const pageStart = visibleCount ? (currentPage - 1) * itemsPerPage + 1 : 0;
      const pageEnd = Math.min(currentPage * itemsPerPage, visibleCount);
      resultsCount.textContent = visibleCount === 0
        ? "Mostrando 0 inmuebles"
        : visibleCount === 1
        ? "Mostrando 1 inmueble"
        : `Mostrando ${pageStart}-${pageEnd} de ${visibleCount} inmuebles`;
    }

    renderPagination(totalPages, visibleCount);
  }

  function renderPagination(totalPages, visibleCount) {
    if (!pagination) {
      return;
    }

    pagination.innerHTML = "";
    pagination.hidden = visibleCount <= itemsPerPage;

    if (pagination.hidden) {
      return;
    }

    for (let page = 1; page <= totalPages; page += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = String(page);
      button.setAttribute("aria-label", `Ir a la página ${page}`);
      button.classList.toggle("is-active", page === currentPage);
      button.addEventListener("click", function () {
        currentPage = page;
        updateResults();
        document.querySelector(".results__head")?.scrollIntoView({ block: "start", behavior: "smooth" });
      });
      pagination.appendChild(button);
    }
  }

  function clearFilters() {
    if (searchInput) {
      searchInput.value = "";
    }

    filterControls.forEach(function (control) {
      control.checked = control.value === "all";
    });

    if (priceRange) {
      priceRange.value = priceRange.max;
      updatePriceRange();
    }

    currentPage = 1;
    updateResults();
  }

  if (listingForm) {
    listingForm.addEventListener("submit", function (event) {
      event.preventDefault();
      updateResults();
      closeFiltersOnMobile();
      document.querySelector(".results__head")?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  }

  if (filterToggle) {
    filterToggle.addEventListener("click", function () {
      setFiltersOpen(!body.classList.contains("filters-open"));
    });
  }

  if (filterClose) {
    filterClose.addEventListener("click", function () {
      setFiltersOpen(false);
    });
  }

  if (filterOverlay) {
    filterOverlay.addEventListener("click", function () {
      setFiltersOpen(false);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && body.classList.contains("filters-open")) {
      setFiltersOpen(false);
    }
  });

  mobileFiltersQuery.addEventListener("change", function (event) {
    if (!event.matches) {
      setFiltersOpen(false);
    }
  });

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      currentPage = 1;
      updateResults();
    });
  }

  if (priceRange) {
    priceRange.addEventListener("input", updatePriceRange);
  }

  filterControls.forEach(function (control) {
    control.addEventListener("change", function () {
      const group = listingForm ? listingForm.querySelectorAll(`[data-filter="${control.dataset.filter}"]`) : [];
      const groupControls = Array.from(group);
      const allControl = groupControls.find(function (item) {
        return item.value === "all";
      });

      if (control.value === "all" && control.checked) {
        groupControls.forEach(function (item) {
          if (item !== control) {
            item.checked = false;
          }
        });
      } else if (control.checked && allControl) {
        allControl.checked = false;
      }

      if (!groupControls.some(function (item) { return item.checked; }) && allControl) {
        allControl.checked = true;
      }

      currentPage = 1;
      updateResults();
    });
  });

  clearButtons.forEach(function (button) {
    button.addEventListener("click", clearFilters);
  });

  if (propertyGrid) {
    propertyGrid.addEventListener("click", function (event) {
      const favoriteButton = event.target.closest("[data-favorite-toggle]");
      if (favoriteButton) {
        event.stopPropagation();
        const isPressed = favoriteButton.getAttribute("aria-pressed") === "true";
        favoriteButton.setAttribute("aria-pressed", String(!isPressed));
        return;
      }

      const card = event.target.closest("[data-card-link]");
      if (card) {
        window.location.href = card.dataset.cardLink;
      }
    });

    propertyGrid.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      if (event.target.closest("[data-favorite-toggle]")) {
        return;
      }

      const card = event.target.closest("[data-card-link]");
      if (card) {
        event.preventDefault();
        window.location.href = card.dataset.cardLink;
      }
    });
  }

  propertyCards = propertyGrid ? Array.from(propertyGrid.querySelectorAll("[data-property-card]")) : [];
  updatePriceRange();
  updateResults();

  const animatedItems = Array.from(document.querySelectorAll(
    ".hero__content, .hero__panel, .section-heading, .empty-state, .trust__box, .referrals, .faq-item"
  )).filter(function (item) {
    return !item.closest(".filters-sidebar");
  });
  if (animatedItems.length) {
    animatedItems.forEach(function (item, index) {
      item.classList.add("reveal");
      item.style.setProperty("--reveal-delay", `${Math.min(index * 55, 360)}ms`);
    });

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      animatedItems.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -5% 0px",
        threshold: 0
      }
    );

    animatedItems.forEach(function (item) {
      observer.observe(item);
    });
  }
})();
