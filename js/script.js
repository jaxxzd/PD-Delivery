import { displayName, getSession } from "./aut.js";

document.addEventListener('DOMContentLoaded', () => {

    // Modal Overlay
    const btnMenu = document.getElementById("btnMenu");
    const modalMenu = document.getElementById("modalMenu");
    const modalClose = document.getElementById("modalClose");
    const modalOverlay = document.getElementById("modalOverlay");

    // função que abre o modal
    function openModalOverlay() {
        modalMenu.classList.add("is-open");
        modalOverlay.classList.add("is-open");
        modalMenu.removeAttribute("inert");
        // Tira o scroll enquanto o modal está aberto
        document.body.style.overflow = "hidden";
    }

    // função que fecha o modal
    function closeModalOverlay() {
        modalMenu.classList.remove("is-open");
        modalOverlay.classList.remove("is-open");
        modalMenu.setAttribute("inert", "");
        // Retorna o scroll da página
        document.body.style.overflow = "";
    }

    // Abre o modal ao clicar no botão de menu
    btnMenu.addEventListener('click', () => openModalOverlay());

    // Fecha o modal ao clicar no botão X
    modalClose.addEventListener('click', () => closeModalOverlay());

    // Fecha ao clicar no overlay (fora do modal)
    modalOverlay.addEventListener('click', () => closeModalOverlay());

    // Scroll Animation

    // Seleciona todos os elementos que serão animados no scroll
    const scrollElements = document.querySelectorAll(".scroll-reveal");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // entry.isIntersecting = true quer dizer que o elemento entrou na viewport
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");

                entry.target.addEventListener('transitionend', () => {
                    entry.target.style.transitionDelay = '0s';
                }, { once: true });

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px'
    });

    scrollElements.forEach(el => observer.observe(el));

    // Modal Overlay para o usuário autenticado
    const modalUser = document.getElementById("modalOverlayUser");
    const ModalMenuUser = document.getElementById("ModalMenuUser");
    const btnOpenModalUser = document.getElementById("container-user");

    const nameModalUser = document.getElementById("nameModalUser");
    const emailModalUser = document.getElementById("emailModalUser");


    function openModalUser() {
        ModalMenuUser.classList.add("is-open");
        modalUser.classList.add("is-open");
        ModalMenuUser.removeAttribute("inert");
    }

    function closeModalUser() {
        ModalMenuUser.classList.remove("is-open");
        modalUser.classList.remove("is-open");
        ModalMenuUser.setAttribute("inert", "");
    }

    btnOpenModalUser.addEventListener("click", (e) => {
        e.stopPropagation(); // impede que o clique já dispare o evento de fechar o modal
        openModalUser();
    });

    document.addEventListener("click", (e) => {
        const clickInsideModal = e.target.closest("#ModalMenuUser");
        const clickOnUsername = e.target.closest("#container-user");

        if (!clickInsideModal && !clickOnUsername) {
            closeModalUser();
        }

    });

    // Função para atualizar os dados do usuário no modal
    function updateDataUserModal() {
        const user = getSession();
        if (!user) return null;

        nameModalUser.textContent = displayName(user.name) || "Usuário";
        emailModalUser.textContent = user.email || "";
    }

    updateDataUserModal();
});