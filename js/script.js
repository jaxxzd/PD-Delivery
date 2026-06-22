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
});