const modal = document.getElementById("imageModal");
const modalImg = modal.querySelector(".modal__img");
const closeBtn = modal.querySelector(".modal__close");

document.querySelectorAll(".gallery__swiper img").forEach((img) => {
    img.addEventListener("click", () => {
        modal.classList.add("active");
        modalImg.src = img.src;
    });
});

document.querySelectorAll(".gallery__slide img").forEach((img) => {
  img.addEventListener("click", () => {
    modal.classList.add("active");
    modalImg.src = img.src;
  });
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});
