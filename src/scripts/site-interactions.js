const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("nav-open", !isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    });
  });
}

document.querySelectorAll("[data-modal-open]").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const modalId = trigger.getAttribute("data-modal-open");
    const modal = modalId ? document.getElementById(modalId) : null;

    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  });
});

document.querySelectorAll("[data-modal]").forEach((modal) => {
  if (!(modal instanceof HTMLDialogElement)) {
    return;
  }

  modal.querySelectorAll("[data-modal-close]").forEach((button) => {
    button.addEventListener("click", () => modal.close());
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });
});

const revealCandidates = document.querySelectorAll(
  ".hero__panel, .properties__visual, .route-card, .service-card, .referral-card, .timeline li, .faq-item, .role-grid article, .rules__cards article"
);

if (document.body.dataset.disableReveal === "true") {
  revealCandidates.forEach((item) => item.classList.remove("reveal", "is-visible"));
} else if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
  revealCandidates.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.setProperty("--reveal-delay", `${Math.min(index * 55, 360)}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealCandidates.forEach((item) => observer.observe(item));
} else {
  revealCandidates.forEach((item) => item.classList.add("is-visible"));
}
