import { getSession } from "./aut.js";

const userRoutes = [
    "/html/userPage-MyData.html",
    "/html/userPage-MyOrders.html"
]

const lojistaRoutes = [
    "dashboardAdmin.html",
    "sectionOrders.html",
    "sectionProduct.html"
]

export function initRouteGuard() {
    const currentPath = window.location.pathname;
    const user = getSession();

    const isUserRoute = userRoutes.some(route => currentPath.includes(route));
    const isLojistaRoute = lojistaRoutes.some(route => currentPath.includes(route));

    if (isUserRoute || isLojistaRoute) {
        if (!user) {
            window.location.href = "/html/login.html";
            return null;
        }

        if (isLojistaRoute && user.type !== "lojista") {
            window.location.href = "/index.html";
            return null;
        }

        if (isUserRoute && user.type === "lojista") {
            window.location.href = "/index.html";
            return null;
        }
    }
}

initRouteGuard();