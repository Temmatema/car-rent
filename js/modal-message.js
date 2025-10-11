export function showModalMessage(type, title, text) {
    const modal = document.getElementById("modalMessage");
    const icon = document.getElementById("modalMessageIcon");
    const modalTitle = document.getElementById("modalMessageTitle");
    const modalText = document.getElementById("modalMessageText");
    const modalBtn = document.getElementById("modalMessageBtn");

    // Настройка контента
    modalTitle.textContent = title;
    modalText.textContent = text;

    if (type === "success") {
        icon.innerHTML = "✅"; // можно заменить на svg
        modalBtn.textContent = "Ok";
        modalBtn.className = "modal-message__btn success";
    } else {
        icon.innerHTML = "❌"; // можно заменить на svg
        modalBtn.textContent = "Попробовать снова";
        modalBtn.className = "modal-message__btn error";
    }

    modal.style.display = "flex";

    // Закрытие по кнопке
    modalBtn.onclick = function () {
        modal.style.display = "none";
    };

    // Закрытие по клику на фон
    modal.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}
