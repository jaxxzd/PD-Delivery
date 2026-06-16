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

    // Carrossel de categorias dos produtos (Mobile)
    const containerBoxes = document.querySelector("#categories-section-mobile #container-boxes-categories");
    const categoryCards = Array.from(document.querySelectorAll("#categories-section-mobile .box-category"));
    const btnPrev = document.querySelector("#btn-prev-categories");
    const btnNext = document.querySelector("#btn-next-categories");
    const totalCategories = categoryCards.length;

    let currentIndex = 0;
    let isTransition = false;

    function updateCarousel() {
        const cardWidth = 164;
        containerBoxes.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    function nextCategory() {
        if (isTransition) return null;
        isTransition = true;
        currentIndex = (currentIndex + 1) % totalCategories;
        updateCarousel();
        setTimeout(() => isTransition = false, 560);
    }

    function prevCategory() {
        if (isTransition) return null;
        isTransition = true;
        currentIndex = (currentIndex - 1 + totalCategories) % totalCategories;
        updateCarousel();
        setTimeout(() => isTransition = false, 560);
    }

    btnPrev.addEventListener('click', () => prevCategory());
    btnNext.addEventListener('click', () => nextCategory());

    updateCarousel();
});