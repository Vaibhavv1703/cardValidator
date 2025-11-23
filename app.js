// Formatter
const inputEl = document.getElementById("card-num");
inputEl.addEventListener("input", () => {
    const rawBefore = inputEl.value;
    const digits = rawBefore.replace(/\D/g, "").slice(0, 19);
    inputEl.value = digits.replace(/(.{4})/g, "$1 ").trim();
});

const validate = () => {
    const resultEl = document.getElementById("result");
    const num = inputEl.value.replace(/\s+/g, "");
    if (!num) {
        resultEl.textContent = "Please enter a card number.";
        resultEl.style.color = "#b00";
        return;
    }

    const type = detectCardType(num);
    const isValid = luhnCheck(num);
    resultEl.textContent = `${type} card ${isValid ? 'is VALID' : 'is INVALID'}`;
    resultEl.style.color = isValid ? "#0a7" : "#b00";
};


function detectCardType(num) {
    if (!/^\d{6,}$/.test(num)) return "Unknown";
    const len = num.length;
    const prefix2 = num.slice(0, 2);
    const prefix3 = num.slice(0, 3);
    const prefix4 = num.slice(0, 4);
    const prefix6 = num.slice(0, 6);

    // Visa: Starts with 4, length 13-19
    if (num[0] === '4' && len >= 13 && len <= 19) return "Visa";

    // MasterCard: 51-55 or 2221-2720, length 16
    const p2 = parseInt(prefix2, 10);
    const p4 = parseInt(prefix4, 10);
    if (len === 16 && ((p2 >= 51 && p2 <= 55) || (p4 >= 2221 && p4 <= 2720))) return "MasterCard";

    // American Express: 34 or 37, length 15
    if (len === 15 && (prefix2 === '34' || prefix2 === '37')) return "American Express";

    // Discover: 6011, 65, 644-649, 622126-622925, length 16-19
    const p3 = parseInt(prefix3, 10);
    const p6 = parseInt(prefix6, 10);
    if ((len >= 16 && len <= 19) && (prefix4 === '6011' || prefix2 === '65' || (p3 >= 644 && p3 <= 649) || (p6 >= 622126 && p6 <= 622925))) return "Discover";

    // RuPay (common ranges): 6521-6522, 353, 356, 508, 607, 652, 814; lengths vary 16
    if (len === 16 && (['5085', '6521', '6522'].includes(prefix4) || ['353', '356', '607', '652', '814'].includes(prefix3))) return "RuPay";

    return "Unknown";
}


// Luhn algorithm implementation
function luhnCheck(number) {
    let sum = 0;
    let shouldDouble = false;
    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number[i], 10);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
}