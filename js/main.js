document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Iniciar el motor de animaciones
    initPopOutAnimations();

    // 2. Mantener funcionalidades básicas (Header y Links) para no romper la UX
    initHeaderScroll();
    initSmoothScroll();
    
    // 3. Slider de fondo (si lo usas)
    initBackgroundSlider();
});

/**
 * MOTOR DE ANIMACIÓN "POP OUT"
 * Busca secciones y elementos clave, y los prepara para saltar a la vista.
 */
function initPopOutAnimations() {
    
    // A. Configurar el Observador (El ojo que vigila el scroll)
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Se activa un poco antes de llegar
        threshold: 0.1 // Con que se vea un 10% del elemento, dispara la animación
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // ¡BUM! Añade la clase que activa el CSS
                entry.target.classList.add('is-visible');
                // Deja de observar para que no se repita y consuma memoria
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // B. Seleccionar elementos para animar
    // Seleccionamos secciones enteras, pero también tarjetas individuales para más detalle
    const elementsToAnimate = document.querySelectorAll(
        '.section, .hero h2, .hero p, .service-card, .about-text, .about-image, .process-step'
    );

    // C. Preparar los elementos (Añadir la clase base .reveal-pop)
    elementsToAnimate.forEach((el) => {
        el.classList.add('reveal-pop');
        
        // D. Lógica de Cascada (Staggering)
        // Si el elemento es una tarjeta dentro de una grid, le damos un retraso
        // basado en su posición para que aparezcan en escalera.
        if (el.classList.contains('service-card') || el.classList.contains('process-step')) {
            // Buscamos su índice entre sus hermanos
            const index = Array.from(el.parentNode.children).indexOf(el);
            // Limitamos el retraso máximo a 500ms para que no sea lento
            const delay = Math.min(index * 100, 500); 
            el.style.transitionDelay = `${delay}ms`;
        }

        // Empezar a observar
        observer.observe(el);
    });
}

/**
 * Header Dinámico (Transparente -> Sólido)
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if(header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        });
    }
}

/**
 * Scroll Suave al dar click en enlaces
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/**
 * Slider de Fondo (Fade suave entre imágenes)
 */
function initBackgroundSlider() {
    const slides = document.querySelectorAll('.bg-slide');
    if (slides.length < 2) return;
    
    let current = 0;
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 5000); // Cambio cada 5 segundos
}