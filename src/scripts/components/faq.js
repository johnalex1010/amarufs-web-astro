// Acordeón de FaqSection: abre una pregunta a la vez dentro de cada lista.
// Soporta varias listas por página y evita inicializar dos veces la misma.
document.querySelectorAll("[data-faq-list]:not([data-faq-ready])").forEach((faqList) => {
  faqList.setAttribute("data-faq-ready", "");

  faqList.querySelectorAll(".faq-item button[aria-controls]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const isOpen = button.getAttribute("aria-expanded") === "true";

      faqList.querySelectorAll(".faq-item").forEach((faqItem) => {
        if (faqItem === item) {
          return;
        }

        faqItem.classList.remove("is-open");
        faqItem.querySelector("button")?.setAttribute("aria-expanded", "false");
      });

      button.setAttribute("aria-expanded", String(!isOpen));
      item?.classList.toggle("is-open", !isOpen);
    });
  });
});
