import { validateForm } from "./form.js";
import { showModalMessage } from "./modal-message.js";

const form = document.getElementById("rentForm");

let lastSubmit = 0; // время последней отправки

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Проверка на частоту
    const now = Date.now();
    if (now - lastSubmit < 15000) {
        showModalMessage(
            "error",
            "Слишком часто",
            "Пожалуйста, подождите 15 секунд перед повторной отправкой"
        );
        return;
    }

    // Валидация
    if (!validateForm()) return;

    lastSubmit = now;

    // Собираем данные из формы
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const birthday = document.getElementById("birthday").value;
    const license = document.getElementById("license").value;
    const date_license = document.getElementById("date_license").value;
    const phone = document.getElementById("phone").value;

    // Новые поля
    const car =
        document
            .querySelector('input[name="car"]:checked')
            ?.nextElementSibling.textContent.trim() || "—";
    const carClass =
        document
            .querySelector('input[name="carClass"]:checked')
            ?.nextElementSibling.textContent.trim() || "—";
    const distance = document.getElementById("distance").value || "0";

    // Telegram данные
    const token = "8261266499:AAEJkXnAW2sVuGK87PY-LtPuSWAgMXFmw1U";
    const chat_id = "429539553";

    // Формируем сообщение
    const message = `
🚗 <b>Новая заявка на аренду авто!</b>

🚙 <b>Машина:</b> ${car}
⚙️ <b>Комплектация:</b> ${carClass}
📏 <b>Планируемый пробег:</b> ${distance} км

👤 <b>Имя:</b> ${name}
👤 <b>Фамилия:</b> ${surname}
📅 <b>Дата рождения:</b> ${birthday}
🪪 <b>В/У:</b> ${license} (выдано: ${date_license})
📱 <b>Телефон:</b> ${phone}
    `;

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
            showModalMessage(
                "success",
                "Заявка отправлена!",
                "Мы скоро с вами свяжемся"
            );
            form.reset();

            // сбрасываем значение range и обновляем подпись
            const distanceInput = document.getElementById("distance");
            const distanceValue = document.getElementById("distanceValue");
            if (distanceInput && distanceValue) {
                distanceInput.value = 0;
                distanceValue.textContent = "0 км";
                distanceInput.style.background = `linear-gradient(to right, #CB2915 0%, #ddd 0%)`;
            }
        })
        .catch((err) => {
            showModalMessage(
                "error",
                "Ошибка при отправке!",
                "Попробуйте снова"
            );
            console.error(err);
        });
});
