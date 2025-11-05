document.addEventListener("click", (e) => {
    const moreBtn = e.target.closest(".btn-more");
    const backBtn = e.target.closest(".btn-back");

    if (moreBtn) {
      e.preventDefault();
      const card = moreBtn.closest(".card");
      card.classList.add("is-open");
    }

    if (backBtn) {
      e.preventDefault();
      const card = backBtn.closest(".card");
      card.classList.remove("is-open");
    }
  });

// Инициализация галерей в каждой карточке отдельно
document.querySelectorAll(".card .card__gallery").forEach(initGallery);

function initGallery(gallery) {
    const track = gallery.querySelector(".gallery__track");
    const slides = Array.from(gallery.querySelectorAll(".gallery__slide"));
    const prev = gallery.querySelector(".gallery__nav--prev");
    const next = gallery.querySelector(".gallery__nav--next");
    const dots = Array.from(gallery.querySelectorAll(".gallery__dot"));

    let index = 0;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

    function goTo(i, withTransition = true) {
        index = clamp(i, 0, slides.length - 1);
        track.style.transition = withTransition
            ? "transform 0.4s ease"
            : "none";
        track.style.transform = `translateX(${-index * 100}%)`;
        dots.forEach((d, di) => {
            d.classList.toggle("is-active", di === index);
            d.setAttribute("aria-selected", di === index ? "true" : "false");
        });
    }

    // Навигация кнопками
    prev?.addEventListener("click", () => goTo(index - 1));
    next?.addEventListener("click", () => goTo(index + 1));

    // Точки
    dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));

    // Обновление позиции при ресайзе (на всякий)
    window.addEventListener("resize", () => goTo(index, false));

    // Стартовая позиция
    goTo(0, false);
}
