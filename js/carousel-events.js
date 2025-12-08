document.addEventListener('DOMContentLoaded', function () {

    // --- Interacciones de mouse ---
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);

    // --- Botón SIGUIENTE ---
    nextButton.addEventListener('click', () => {
        handleUserInteraction(goToNextSlide);
    });

    // --- Botón ANTERIOR ---
    prevButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.carousel-item.current-slide') || slides[0];
        const currentDot = dotsNav.querySelector('.current-slide') || dots[0];

        let prevSlide = currentSlide.previousElementSibling;
        let prevDot = currentDot.previousElementSibling;

        if (!prevSlide) {
            prevSlide = slides[slides.length - 1];
            prevDot = dots[dots.length - 1];
        }

        handleUserInteraction(() => {
            moveToSlide(track, currentSlide, prevSlide);
            updateDots(currentDot, prevDot);
        });
    });

    // --- Click en puntos ---
    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button');
        if (!targetDot) return;

        handleUserInteraction(() => {
            const currentSlide = track.querySelector('.carousel-item.current-slide') || slides[0];
            const currentDot = dotsNav.querySelector('.current-slide') || dots[0];
            const targetIndex = dots.findIndex(dot => dot === targetDot);
            const targetSlide = slides[targetIndex];

            moveToSlide(track, currentSlide, targetSlide);
            updateDots(currentDot, targetDot);
        });
    });

    // --- Inicialización ---
    slides[0].classList.add('current-slide');
    dots[0].classList.add('current-slide');
    startAutoPlay();
});
