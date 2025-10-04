import { showModalMessage } from "./modal-message.js";
import { validateForm } from "./form.js";

document.getElementById("rentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    let name = document.getElementById("name").value;
    let birthday = document.getElementById("birthday").value;
    let license = document.getElementById("license").value;
    let date_license = document.getElementById("date_license").value;
    let phone = document.getElementById("phone").value;

    let message = `
🚗 Новая заявка на аренду авто!
👤 ФИО: ${name}
📅 Дата рождения: ${birthday}
🪪 В/У: ${license} (выдано: ${date_license})
📱 Телефон: ${phone}
    `;

    let token = "8261266499:AAEJkXnAW2sVuGK87PY-LtPuSWAgMXFmw1U";
    let chat_id = "429539553";

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chat_id,
            text: message,
            parse_mode: "HTML",
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            showModalMessage("success", "Заявка отправлена!", "Мы скоро с вами свяжемся");
        })
        .catch((err) => {
            showModalMessage("error", "Ошибка при отправке!", "Пожалуйста, попробуйте снова");
            console.error(err);
        });
});

