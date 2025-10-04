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

const gallerySwiper = new Swiper(".gallery__swiper", {
    grabCursor: true,
    centeredSlides: true,
    loop: true,

    effect: "coverflow",

    slidesPerView: 1,
    pagination: {
        el: ".swiper-pagination",
    },
    navigation: {
        nextEl: ".gallery-button-next",
        prevEl: ".gallery-button-prev",
    },

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

            navigation: false,
            pagination: false,
        },
    },
});
