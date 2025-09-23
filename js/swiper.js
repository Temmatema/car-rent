const heroSwiper = new Swiper(".hero__swiper", {
  loop: true,
  slidesPerView: 1,
  effect: "fade",
  
  speed: 1000,
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
        const opacity = 1 - Math.min(Math.abs(slideProgress / 2), 0.5);
        slide.style.transform = `scale(${scale})`;
        slide.style.opacity = opacity;
      });
    },
    setTransition(swiper, transition) {
      swiper.slides.forEach((slide) => {
        slide.style.transition = `${transition}ms`;
      });
    },
  },
});