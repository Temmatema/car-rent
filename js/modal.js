const modal = document.getElementById("imageModal");
const modalImg = modal.querySelector(".modal__img");
const closeBtn = modal.querySelector(".modal__close");

// открытие модалки по клику на картинку
document.querySelectorAll(".gallery__swiper img").forEach((img) => {
  img.addEventListener("click", () => {
    modal.classList.add("active");
    modalImg.src = img.src;
  });
});

// закрытие по крестику
closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

// закрытие по клику на фон
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});
