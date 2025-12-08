// --- Funciones principales del carrusel ---

const moveToSlide = (track, currentSlide, targetSlide) => {
    const targetIndex = slides.findIndex(slide => slide === targetSlide);
    track.style.transform = 'translateX(-' + (targetIndex * 100) + '%)';
    
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
};

const goToNextSlide = () => {
    const currentSlide = track.querySelector('.carousel-item.current-slide') || slides[0];
    let currentDot = dotsNav.querySelector('.current-slide') || dots[0];

    let nextSlide = currentSlide.nextElementSibling;
    let nextDot = currentDot.nextElementSibling;

    if (!nextSlide) {
        nextSlide = slides[0];
        nextDot = dots[0];
    }

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
};

// --- AutoPlay ---

const startAutoPlay = () => {
    autoPlayInterval = setInterval(goToNextSlide, intervalTime);
};

const stopAutoPlay = () => {
    clearInterval(autoPlayInterval);
};

// Manejo de interacción
const handleUserInteraction = (action) => {
    stopAutoPlay();
    action();
    startAutoPlay();
};
