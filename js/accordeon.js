document.querySelectorAll(".faq__question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.parentElement;
    item.classList.toggle("active");

    document.querySelectorAll(".faq__item").forEach((i) => {
      if (i !== item) i.classList.remove("active");
    });
  });
});
