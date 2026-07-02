import { get } from "./api.js";

//── Máscara para o input de telefone
export function initPhoneMask() {
    const telInput = document.getElementById("tel-register")
    if (!telInput) return null;
    telInput.addEventListener("input", (e) => {
        let digits = e.target.value.replace(/\D/g, "");
        let result = "";
        if (digits.length > 0) {
            result = "(" + digits.substring(0, 2);
            if (digits.length > 2) {
                result += ") " + digits.substring(2, 7);
                if (digits.length > 7) result += "-" + digits.substring(7, 11);
            }
        }
        e.target.value = result;
    });
}

//── Função de ver e esconder os dígitos do input de senha

function initViewPassword() {
    const inputPassword = document.getElementById("password-register") || document.getElementById("password-login");
    const containerEyeIcon = document.querySelector(".container-icon-eye");
    if (!inputPassword || !containerEyeIcon) return null;

    inputPassword.addEventListener("input", () => {
        containerEyeIcon.classList.toggle("is-visible", inputPassword.value.length > 0);
    });

    containerEyeIcon.addEventListener("click", () => {
        const isPassword = inputPassword.type === "password";

        inputPassword.type = isPassword ? "text" : "password";

        const eyeIcon = document.getElementById("eye-open");
        eyeIcon.setAttribute("data-lucide", isPassword ? "eye-closed" : "eye");
        lucide.createIcons();
    });
}

//── Regex de email e telefone

function regexEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function regexPhone(phone) {
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return phoneRegex.test(phone);
}

//── Feedback visual para os inputs

function setError(inputId, message) {
    const input = document.getElementById(inputId);
    if (!input) return null;

    const containerInput = input.closest(".container-input");
    containerInput.classList.add("input-error");
    if (!containerInput) return null;

    let msg = containerInput.parentElement.querySelector(".error-message");

    if (!msg) {
        msg = document.createElement("p");
        msg.classList.add("error-message");
        msg.textContent = message;
        containerInput.parentElement.appendChild(msg);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => msg.classList.add("show"));
        });
    } else {
        clearTimeout(input._errorTimeout);

    }

    input._errorTimeout = setTimeout(() => clearError(inputId), 3000);
}

function clearError(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return null;

    clearTimeout(input._errorTimeout);

    const containerInput = input.closest(".container-input");
    if (!containerInput) return null;
    containerInput.classList.remove("input-error");

    const msg = containerInput.parentElement.querySelector(".error-message");

    msg.classList.remove("show");

    msg.addEventListener("transitionend", () => msg.remove(), { once: true });
}

function clearErrorOnInput(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return null;


    input.addEventListener("input", () => clearError(inputId));
}

function clearErrorOnInputType() {
    ["name-register", "email-register", "password-register", "tel-register", "email-login", "password-login"].forEach(clearErrorOnInput);
}

//── Validação de formulário do cadastro

export async function validateRegister() {
    const name = document.getElementById("name-register");
    const email = document.getElementById("email-register");
    const password = document.getElementById("password-register");
    const phone = document.getElementById("tel-register");
    const btnRegister = document.getElementById("btn-register");

    let hasError = false;

    if (!name.value.trim()) {
        setError("name-register", "Nome inválido");
        hasError = true;
    }
    if (!regexEmail(email.value.trim())) {
        setError("email-register", "Email inválido");
        hasError = true;
    }
    if (!password.value.trim()) {
        setError("password-register", "Senha inválida");
        hasError = true;
    }
    if (!regexPhone(phone.value.trim())) {
        setError("tel-register", "Telefone inválido");
        hasError = true;
    }

    return !hasError
}

//── Validação de formulário do login

export async function validateLogin() {
    const email = document.getElementById("email-login");
    const password = document.getElementById("password-login");

    let hasError = false;

    if (!regexEmail(email.value.trim())) {
        setError("email-login", "Email ou senha inválidos.");
        hasError = true;
    }

    if (!password.value.trim()) {
        setError("password-login", "Email ou senha inválidos.");
        hasError = true;
    }

    return !hasError;
}

initPhoneMask();
initViewPassword();
clearErrorOnInputType();

export { setError };