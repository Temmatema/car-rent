import "./swiper.js";
import "./form.js";
import "./telegram.js";

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
