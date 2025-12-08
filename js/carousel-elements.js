// Selección de elementos del carrusel
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');
const dotsNav = document.querySelector('.carousel-nav');
const dots = Array.from(dotsNav.children);
const carouselContainer = document.querySelector('.carousel-container');

// Configuración del autoplay
const intervalTime = 200000; // Tiempo entre cambios automáticos (en ms)
let autoPlayInterval;

document.addEventListener('DOMContentLoaded', () => {
    initLightbox();
});

function initLightbox() {
    // Referencias a los elementos del modal
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    const closeBtn = document.querySelector(".lightbox-close");
    
    // 1. Detectar clicks en las imágenes dentro del carrusel
    // Usamos el contenedor principal para detectar clicks incluso en items clonados
    const carouselContainer = document.querySelector('.carousel-container');
    
    if(carouselContainer) {
        carouselContainer.addEventListener('click', (e) => {
            // Verificamos si lo que se clickeó fue una imagen
            if (e.target.tagName === 'IMG' && e.target.closest('.carousel-item')) {
                e.stopPropagation(); // Evita conflictos con el arrastre del carrusel
                
                modal.style.display = "flex"; // Usamos flex para centrar
                modalImg.src = e.target.src; // Ponemos la imagen clickeada
            }
        });
    }

    // 2. Función para cerrar el modal
    const closeModal = () => {
        modal.style.display = "none";
    };

    // Cerrar al dar click en la X
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Cerrar al dar click fuera de la imagen (en el fondo negro)
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Cerrar con la tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && modal.style.display === "flex") {
                closeModal();
            }
        });
    }
}