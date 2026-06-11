document.addEventListener('DOMContentLoaded', () => {
    // Seleção dos cards e containers
    const cards = document.querySelectorAll(".carrosel-card");
    const container = document.querySelector(".carrosel-cards");
    const wrapper = document.querySelector(".container-wrapper");

    // índice do card ativo
    let currentIndex = Math.floor(cards.length / 2);

    let resizeTimeOut

    function upCarousel() {
        // remove a classe "active"
        cards.forEach(card => {
            card.classList.remove("active");
        });
        // Adiciona a classe "active" ao card central
        if (cards[currentIndex]) {
            cards[currentIndex].classList.add("active");
        }

        // Calcula a largura do card e o gap
        const cardWidth = cards[0].offsetWidth;
        const gap = parseInt(getComputedStyle(container).gap) || 20;
        const cardValueWidth = cardWidth + gap;

        const wrapperWidth = wrapper ? wrapper.offsetWidth : window.innerWidth
    }
})

