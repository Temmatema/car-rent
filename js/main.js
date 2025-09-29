import "./swiper.js";
import "./phone.js";
import "./modal.js";
import "./accordeon.js";
import "./telegram.js";

document.addEventListener("DOMContentLoaded", function () {
    const image = document.querySelector(".app__image");
    const omodaBtn = document.querySelector(".name-omoda");
    const exeedBtn = document.querySelector(".name-exeed");
    const oraBtn = document.querySelector(".name-ora");

    function changeCarImage(src) {
        if (!image) return;
        image.style.opacity = 0;
        setTimeout(() => {
            image.src = src;
            image.onload = () => {
                image.style.opacity = 1;
            };
        }, 200);
    }

    if (image && omodaBtn && exeedBtn && oraBtn) {
        omodaBtn.addEventListener("click", () =>
            changeCarImage("img/mobile/omoda-mobile.webp")
        );
        exeedBtn.addEventListener("click", () =>
            changeCarImage("img/mobile/exeed-mobile.webp")
        );
        oraBtn.addEventListener("click", () =>
            changeCarImage("img/mobile/ora-mobile.webp")
        );
    }
});

const burger = document.querySelector(".burger");
const nav = document.querySelector(".header__nav");

burger.addEventListener("click", () => {
    const expanded = burger.classList.toggle("active");
    nav.classList.toggle("active");
    burger.setAttribute("aria-expanded", expanded);
});

document.querySelectorAll(".plans__card").forEach((card) => {
    card.addEventListener("click", (e) => {
        if (e.target.closest(".card__btn")) return;

        const toggle = card.querySelector(".plans__toggle");
        const desc = card.querySelector(".card__desc");
        desc.classList.toggle("active");
        toggle.classList.toggle("active");
    });
});
