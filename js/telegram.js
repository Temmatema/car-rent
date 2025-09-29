document.getElementById("rentForm").addEventListener("submit", function (e) {
    e.preventDefault();

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

    let url = `https://api.telegram.org/bot${token}/sendMessage`;

    fetch(url, {
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
            showModalMessage("Заявка отправлена!", true);
        })
        .catch((err) => {
            showModalMessage("Ошибка при отправке!", false);
            console.error(err);
        });
});
