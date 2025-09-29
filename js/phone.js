const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.startsWith("7")) value = value.substring(1);

    let result = "+7";
    if (value.length > 0) result += "(" + value.substring(0, 3);
    if (value.length >= 4) result += ") " + value.substring(3, 6);
    if (value.length >= 7) result += "-" + value.substring(6, 8);
    if (value.length >= 9) result += "-" + value.substring(8, 10);

    e.target.value = result;
});

document.querySelector(".form").addEventListener("submit", (e) => {
    const digits = phoneInput.value.replace(/\D/g, "");
    if (digits.length !== 11) {
        e.preventDefault();
        alert("Введите корректный номер телефона");
    }
});

const licenseInput = document.getElementById("license");

licenseInput.addEventListener("input", (e) => {
    let value = e.target.value.toUpperCase();
    value = value.replace(/[^0-9A-ZА-Я]/g, "");

    let result = "";

    if (value.length > 0) result += value.substring(0, 2);
    if (value.length >= 3) result += " " + value.substring(2, 4);
    if (value.length >= 5) result += " " + value.substring(4, 10);

    e.target.value = result;
});

document.querySelector(".form").addEventListener("submit", (e) => {
    const license = licenseInput.value;
    const pattern = /^\d{2}\s(\d{2}|[A-Z]{2})\s\d{6}$/;

    if (!pattern.test(license)) {
        e.preventDefault();
        alert(
            "Введите корректный номер водительского удостоверения (например: 99 99 123456 или 99 AB 123456)"
        );
    }
});

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

const crosses = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 10 + Math.random() * 10,
    angle: Math.random() * 360,
    speed: 0.0001 + Math.random() * 0.02,
}));

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(110, 110, 110, 0.13)";
    ctx.lineWidth = 2;
    crosses.forEach((c) => {
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.angle);
        ctx.beginPath();
        ctx.moveTo(-c.size, 0);
        ctx.lineTo(c.size, 0);
        ctx.moveTo(0, -c.size);
        ctx.lineTo(0, c.size);
        ctx.stroke();
        ctx.restore();
        c.angle += c.speed;
    });
    requestAnimationFrame(draw);
}
draw();
