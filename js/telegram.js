import { validateForm } from "./form.js";
import { showModalMessage } from "./modal-message.js";

const form = document.getElementById("rentForm");

let lastSubmit = 0; // время последней отправки

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // проверка на частоту
    const now = Date.now();
    if (now - lastSubmit < 15000) { // 10 секунд = 10000 мс
        showModalMessage("error", "Слишком часто", "Пожалуйста, подождите 15 секунд перед повторной отправкой");
        return;
    }

    // валидация
    if (!validateForm()) return;

    lastSubmit = now; // обновляем время отправки

    // данные
    let data = {
        name: document.getElementById("name").value,
        birthday: document.getElementById("birthday").value,
        license: document.getElementById("license").value,
        date_license: document.getElementById("date_license").value,
        phone: document.getElementById("phone").value,
    };

    // твой токен и чат
    let token = "8261266499:AAEJkXnAW2sVuGK87PY-LtPuSWAgMXFmw1U";
    let chat_id = "429539553";

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chat_id,
            text: `
🚗 Новая заявка на аренду авто!
👤 ФИО: ${data.name}
📅 Дата рождения: ${data.birthday}
🪪 В/У: ${data.license} (выдано: ${data.date_license})
📱 Телефон: ${data.phone}
            `,
            parse_mode: "HTML",
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            showModalMessage("success", "Заявка отправлена!", "Мы скоро с вами свяжемся");
        })
        .catch((err) => {
            showModalMessage("error", "Ошибка при отправке!", "Попробуйте снова");
            console.error(err);
        });
});

