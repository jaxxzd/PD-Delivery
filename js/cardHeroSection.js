document.addEventListener('DOMContentLoaded', () => {
    const cards = Array.from(document.querySelectorAll(".carrossel-card"));
    const carrosselContainer = document.querySelector(".carrossel-container");
    const totalCards = cards.length;

    let currentIndex = Math.floor(totalCards / 2);
    let isTransition = false;
    let autoPlay = null;

    function updateCarousel() {
        cards.forEach((card, idx) => {
            card.classList.remove("is-prev", "is-next", "is-active");
            // Calcula a posição do card em relação ao card ativo
            const cardPosition = ((idx - currentIndex) + totalCards) % totalCards;

            if (cardPosition === 0) {
                card.classList.add("is-active");
            } else if (cardPosition === 1) {
                card.classList.add("is-next");
            } else if (cardPosition === totalCards - 1) {
                card.classList.add("is-prev");
            }
        });

    }

    // Avança um card no sentido horário
    function nextCard() {
        if (isTransition) return null;
        isTransition = true;
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
        setTimeout(() => isTransition = false, 560);
    }

    // Volta um card no sentido anti-horário
    function prevCard() {
        if (isTransition) return null;
        isTransition = true;
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
        setTimeout(() => isTransition = false, 560);
    }

    cards.forEach((card, idx) => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.btn-view-details, .btn-add-cart-mobile, .btn-add-cart-desktop')) return null; // evita o clique dos botões propagarem para o carrossel
            // Ignora clique no card que já tá ativo
            if (idx === currentIndex) return null;

            const cardPosition = ((idx - currentIndex) + totalCards) % totalCards;

            stopAutoPlay();
            if (cardPosition === 1) {
                nextCard();
            } else if (cardPosition === totalCards - 1) {
                prevCard();
            }

            setTimeout(() => startAutoPlay(), 4000);
        });
    });

    window.addEventListener('keydown', (e) => {
        // Tecla esquerda volta um card
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            stopAutoPlay();
            prevCard();
            setTimeout(() => startAutoPlay(), 4000);
        }

        // Tecla direita avança um card
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            stopAutoPlay();
            nextCard();
            setTimeout(() => startAutoPlay(), 4000);
        }
    });

    // Ativa o autoplay do carrossel
    function startAutoPlay() {
        if (autoPlay) clearInterval(autoPlay);
        autoPlay = setInterval(nextCard, 4000);
    }

    // Para o autoplay do carrossel
    function stopAutoPlay() {
        clearInterval(autoPlay);
        autoPlay = null;
    }

    // Desativo o autoplay quando coloca o mouse sob o container
    carrosselContainer.addEventListener('mouseenter', stopAutoPlay);
    // Ativa o autoplay quando tira o mouse sob o container
    carrosselContainer.addEventListener('mouseleave', startAutoPlay);

    updateCarousel();
    startAutoPlay();
});