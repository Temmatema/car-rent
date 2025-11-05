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
    const originalSlides = Array.from(gallery.querySelectorAll(".gallery__slide"));
    const prev = gallery.querySelector(".gallery__nav--prev");
    const next = gallery.querySelector(".gallery__nav--next");
    const dots = Array.from(gallery.querySelectorAll(".gallery__dot"));

    const total = originalSlides.length;
    if (total === 0) return;

    // 1) Клонируем крайние слайды: [last]* + [1..n] + [first]*
    const firstClone = originalSlides[0].cloneNode(true);
    const lastClone = originalSlides[total - 1].cloneNode(true);
    firstClone.setAttribute("aria-hidden", "true");
    lastClone.setAttribute("aria-hidden", "true");

    track.insertBefore(lastClone, originalSlides[0]); // prepend
    track.appendChild(firstClone); // append

    // Обновляем коллекцию слайдов с учётом клонов
    let slides = Array.from(track.querySelectorAll(".gallery__slide"));

    // Текущий индекс в диапазоне [0..slides.length-1]
    // Стартуем с 1, т.к. 0 — это клон последнего слайда
    let index = 1;
    let isAnimating = false;

    function setTransition(enabled) {
        track.style.transition = enabled ? "transform 0.4s ease" : "none";
    }

    function translateTo(i) {
        track.style.transform = `translateX(${-i * 100}%)`;
    }

    function realIndex() {
        // Индекс для точек: сопоставляем [1..total] циклически
        return (index - 1 + total) % total;
    }

    function updateDots() {
        const r = realIndex();
        dots.forEach((d, di) => {
            const active = di === r;
            d.classList.toggle("is-active", active);
            d.setAttribute("aria-selected", active ? "true" : "false");
        });
    }

    function goTo(i) {
        if (isAnimating) return;
        isAnimating = true;
        setTransition(true);
        index = i;
        translateTo(index);
        // Обновим точки сразу — визуально приятнее
        updateDots();
    }

    // После анимации прыгаем на «реальный» слайд без анимации, если ушли в клон
    track.addEventListener("transitionend", () => {
        setTransition(false);

        if (index === slides.length - 1) {
            // На правом клоне -> прыгаем на первый реальный
            index = 1;
            translateTo(index);
        } else if (index === 0) {
            // На левом клоне -> прыгаем на последний реальный
            index = slides.length - 2;
            translateTo(index);
        }

        // Фикс на случай мгновенных кликов подряд
        // Даем браузеру применить transform без transition
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setTransition(true);
                isAnimating = false;
            });
        });
    });

    // Навигация кнопками
    prev?.addEventListener("click", () => goTo(index - 1));
    next?.addEventListener("click", () => goTo(index + 1));

    // Точки
    dots.forEach((dot, i) =>
        dot.addEventListener("click", () => goTo(i + 1)) // +1: смещение из-за левого клона
    );

    // Обновление позиции при ресайзе (сохраняем текущий слайд без анимации)
    window.addEventListener("resize", () => {
        const wasAnimating = isAnimating;
        setTransition(false);
        translateTo(index);
        setTransition(!wasAnimating);
    });

    // Стартовая позиция: первый реальный слайд
    setTransition(false);
    translateTo(index);
    updateDots();
}
