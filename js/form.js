import { showModalMessage } from "./modal-message.js";

const phoneInput = document.getElementById("phone");
const licenseInput = document.getElementById("license");

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

licenseInput.addEventListener("input", (e) => {
    let value = e.target.value.toUpperCase();
    value = value.replace(/[^0-9A-ZА-Я]/g, "");

    let result = "";
    if (value.length > 0) result += value.substring(0, 2);
    if (value.length >= 3) result += " " + value.substring(2, 4);
    if (value.length >= 5) result += " " + value.substring(4, 10);

    e.target.value = result;
});

function setDateMask(input) {
    input.addEventListener("input", function () {
        let value = input.value.replace(/\D/g, "");
        if (value.length > 8) value = value.slice(0, 8);

        let formatted = "";
        if (value.length > 0) formatted = value.slice(0, 2);
        if (value.length > 2) formatted += "." + value.slice(2, 4);
        if (value.length > 4) formatted += "." + value.slice(4, 8);

        input.value = formatted;
    });
}
setDateMask(document.getElementById("birthday"));
setDateMask(document.getElementById("date_license"));

function isValidDate(dateStr) {
    const parts = dateStr.split(".");
    if (parts.length !== 3) return false;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) return false;
    if (year < 1900 || year > 2100) return false;
    if (month < 1 || month > 12) return false;

    const daysInMonth = new Date(year, month, 0).getDate();
    return day >= 1 && day <= daysInMonth;
}

export function validateForm() {
    let valid = true;

    // телефон
    const digits = phoneInput.value.replace(/\D/g, "");
    if (digits.length !== 11) {
        showModalMessage("error", "Ошибка ввода", "Введите корректный номер телефона");
        valid = false;
    }

    // В/У
    const license = licenseInput.value;
    const pattern = /^\d{2}\s[A-ZА-Я0-9]{2}\s\d{6}$/; 
    if (!pattern.test(license)) {
        showModalMessage("error", "Ошибка ввода", "Введите корректный номер В/У (например: 99 AB 123456 или 99 9A 123456)");
        valid = false;
    }

    // даты
    const birthday = document.getElementById("birthday").value;
    const dateLicense = document.getElementById("date_license").value;

    if (!isValidDate(birthday)) {
        showModalMessage("error", "Ошибка даты", "Введите корректную дату рождения (ДД.ММ.ГГГГ)");
        valid = false;
    }

    if (!isValidDate(dateLicense)) {
        showModalMessage("error", "Ошибка даты", "Введите корректную дату выдачи В/У (ДД.ММ.ГГГГ)");
        valid = false;
    }

    return valid;
}

