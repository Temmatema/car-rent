/*const heroSwiper = new Swiper(".hero__swiper", {
  loop: true,
  slidesPerView: 1,
  effect: "fade",
  autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
  speed: 1000,
  delay: 3000,
  disableOnInteraction: false,
});*/

let plansSwiper = null;

function initPlansSwiper() {
  if (window.innerWidth > 480 && !plansSwiper) {
    plansSwiper = new Swiper(".plans__swiper", {
      slidesPerView: "auto",
      centeredSlides: true,
      spaceBetween: 0,
      watchSlidesProgress: true,
      initialSlide: 1,
      on: {
        progress(swiper) {
          swiper.slides.forEach((slide) => {
            const slideProgress = slide.progress;
            const scale = 1 - Math.min(Math.abs(slideProgress * 0.2), 0.4);
            slide.style.transform = `scale(${scale})`;
          });
        },
        setTransition(swiper, transition) {
          swiper.slides.forEach((slide) => {
            slide.style.transition = `${transition}ms`;
          });
        },
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  } else if (window.innerWidth < 480 && plansSwiper) {
    plansSwiper.destroy(true, true);
    plansSwiper = null;
  }
}

initPlansSwiper();

window.addEventListener("resize", initPlansSwiper);


const gallerySwiper = new Swiper(".gallery__swiper", {
  grabCursor: true,
  centeredSlides: true,
  loop: true,

  // ставим effect глобально
  effect: "coverflow",

  // базовые настройки (мобилка < 480px)
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".gallery-button-next",
    prevEl: ".gallery-button-prev",
  },

  // адаптив
  breakpoints: {
    480: {
      slidesPerView: 4,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      speed: 7000,

      // убираем стрелки и пагинацию
      navigation: false,
      pagination: false,
    }
  }
});


