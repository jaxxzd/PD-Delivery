// Máscara para o input de telefone
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

initPhoneMask();

// Funcionalidade de ver e esconder os dígitos do input de senha

function initViewPassword() {
    const inputPassword = document.getElementById("password-register") || document.getElementById("password-login");
    const containerEyeIcon = document.querySelector(".container-icon-eye");
    if (!inputPassword || !containerEyeIcon) return null;

    inputPassword.addEventListener("input", () => {
        containerEyeIcon.classList.toggle("is-visible", inputPassword.value.length > 0);
    })

    containerEyeIcon.addEventListener("click", () => {
        const isPassword = inputPassword.type === "password";

        inputPassword.type = isPassword ? "text" : "password";

        const eyeIcon = document.getElementById("eye-open");
        eyeIcon.setAttribute("data-lucide", isPassword ? "eye-closed" : "eye");
        lucide.createIcons();
    })
}

initViewPassword();