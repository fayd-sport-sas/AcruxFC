// ============================================
// INICIALIZAR AOS ANIMATIONS
// ============================================
AOS.init({
    duration: 800,
    once: true,
    offset: 80,
});

// ============================================
// NAVBAR - Efecto scroll y menú móvil
// ============================================
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Cambiar fondo al hacer scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Menú hamburguesa
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ============================================
// SMOOTH SCROLL - Navegación suave
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ACTIVE LINK - Resaltar sección visible
// ============================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a:not(.nav-cta)');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// CONTACTO - Validación y feedback
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const btn = this.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    // Estado de carga
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;
    
    // Simulación de envío (reemplazar con fetch real)
    setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> ¡Solicitud enviada!';
        btn.style.background = '#22C55E';
        
        // Reset después de 3 segundos
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.disabled = false;
            this.reset();
        }, 3000);
    }, 2000);
});

// ============================================
// CONTADOR DE ESTADÍSTICAS (Animación)
// ============================================
function animateCounter() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const text = stat.textContent;
        const number = parseInt(text);
        const suffix = text.replace(/[0-9]/g, '');
        
        if (isNaN(number)) return;
        
        let current = 0;
        const increment = Math.ceil(number / 60);
        const duration = 2000;
        const stepTime = duration / 60;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            stat.textContent = current + suffix;
        }, stepTime);
    });
}

// Observador para activar contador cuando la sección hero sea visible
const heroSection = document.querySelector('.hero');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (heroSection) {
    observer.observe(heroSection);
}
// ============================================
// CARRUSEL DE ENTRENAMIENTOS
// ============================================
const track = document.getElementById('carouselTrack');
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
let totalSlides = slides.length;
let autoPlayInterval;
const AUTOPLAY_DELAY = 5000;

// Función para mover el carrusel
function goToSlide(index) {
    // Loop infinito
    if (index < 0) {
        currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }
    
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
    
    // Actualizar indicadores
    indicators.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

// Event listeners para botones
prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
    resetAutoplay();
});

nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
    resetAutoplay();
});

// Event listeners para indicadores (puntos)
indicators.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.dataset.index);
        goToSlide(index);
        resetAutoplay();
    });
});

// Autoplay
function startAutoplay() {
    autoPlayInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, AUTOPLAY_DELAY);
}

function resetAutoplay() {
    clearInterval(autoPlayInterval);
    startAutoplay();
}

// Iniciar autoplay
startAutoplay();

// Pausar autoplay cuando el mouse está sobre el carrusel
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(autoPlayInterval);
});

carouselContainer.addEventListener('mouseleave', () => {
    startAutoplay();
});

// Soporte para touch (swipe en móviles)
let touchStartX = 0;
let touchEndX = 0;

carouselContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carouselContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(currentIndex - 1);
        }
        resetAutoplay();
    }
});

console.log('📸 Carrusel de entrenamientos inicializado');

console.log('⚽ Acrux Fútbol Club - Sitio web profesional cargado con éxito!');