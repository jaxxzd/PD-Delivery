import { get, post } from "./api.js";

export function getSession() {
    const data = localStorage.getItem("pd-user");
    return data ? JSON.parse(data) : null;
}

function saveSession(user) {
    localStorage.setItem("pd-user", JSON.stringify(user));
}

export function logOut() {
    localStorage.removeItem("pd-user");
    window.location.href = "/index.html";
}

export async function initRegister() {
    const btnRegister = document.getElementById("btn-register");
    if (!btnRegister) return null;

    btnRegister.addEventListener("click", async () => {
        const name = document.getElementById("name-register").value.trim();
        const email = document.getElementById("email-register").value.trim();
        const password = document.getElementById("password-register").value.trim();
        const phone = document.getElementById("tel-register").value.trim();

        if (!name) {
            // Feedback visual
        }
        if (!email) {
            // Feedback visual
        }
        if (!password) {
            // Feedback visual
        }
        if (!phone) {
            // Feedback visual
        }

        try {
            const user = await get("/users");
            const existUser = user.find(u => u.email === email);
            if (existUser) {
                // Feedback visual
            }

            const newUser = await post("/users", {
                name,
                email,
                password,
                phone,
                type: "user"
            });

            saveSession(newUser);
            window.location.href = "/index.html";

        } catch (error) {
            console.error("Erro ao se registrar", error);
            // Feedback visual
        }
    });
}

export function initLogin() {
    const btnLogin = document.getElementById("btn-login");
    if (!btnLogin) return null;

    btnLogin.addEventListener("click", async () => {
        const email = document.getElementById("email-login").value.trim();
        const password = document.getElementById("password-login").value.trim();

        try {
            const users = await get("/users");
            const user = users.find(u => u.email === email && u.password === password);

            if (!user) {
                // Feedback visual
            }

            saveSession(user);
            window.location.href = "/index.html";

        } catch (error) {
            console.error("Erro ao se registrar", error);
            // Feedback visual
        }
    });

}

function displayName(fullName) {
    const parts = fullName.split(/\s+/);

    if (parts.length === 1) return parts[0];

    const firstName = parts[0];
    const lastName = parts[parts.length - 1];

    return `${firstName} ${lastName}`;
}

export function updateHeader() {
    const user = getSession();
    if (!user) return null;

    const containerUser = document.getElementById("container-user");
    const nameUser = document.getElementById("name-user");
    const containerLojista = document.getElementById("container-lojista");
    const nameLojista = document.getElementById("name-lojista");
    const btnLoginIndex = document.getElementById("btnLoginIndex");

    if (user.type === "lojista") {
        containerLojista.style.display = "flex";
        nameLojista.textContent = displayName(user.name);

        btnLoginIndex.style.display = "none";

        containerLojista.addEventListener("click", () => {
            window.location.href = "/html/dashboardAdmin.html";
        });
    } else {
        containerUser.style.display = "flex";
        nameUser.textContent = displayName(user.name);
        btnLoginIndex.style.display = "none";
    }
}

const btnLogOut = document.getElementById("link-logout");

if (btnLogOut) {
    btnLogOut.addEventListener("click", () => logOut());
}

initRegister(); 
initLogin();
updateHeader(); 