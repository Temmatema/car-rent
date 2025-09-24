const heroSwiper = new Swiper(".hero__swiper", {
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
});


const plansSwiper = new Swiper(".plans__swiper", {
  slidesPerView: 'auto',
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