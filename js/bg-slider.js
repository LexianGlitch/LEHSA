document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.bg-slide');
    
    // Configuración
    const intervalTime = 2000; // 1 segundo
    let currentSlide = 0;

    // Función para cambiar el fondo
    const nextSlide = () => {
        // Quitar clase active de la actual
        slides[currentSlide].classList.remove('active');
        
        // Calcular la siguiente (loop infinito)
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Poner clase active a la siguiente
        slides[currentSlide].classList.add('active');
    };

    // Iniciar el intervalo si hay imágenes
    if (slides.length > 0) {
        setInterval(nextSlide, intervalTime);
    }
});