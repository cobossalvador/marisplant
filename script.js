// ============================================
// DATOS DE PRODUCTOS
// ============================================
const plantas = [
    // Plantas de Interior
    { nombre: "Pothos", categoria: "interior", precios: { pequeña: 25, mediana: 45, grande: 75 }, icon: "🌿" },
    { nombre: "Monstera", categoria: "interior", precios: { pequeña: 35, mediana: 65, grande: 110 }, icon: "🌱" },
    { nombre: "Sansevieria", categoria: "interior", precios: { pequeña: 30, mediana: 50, grande: 85 }, icon: "🪴" },
    { nombre: "Ficus", categoria: "interior", precios: { pequeña: 40, mediana: 70, grande: 120 }, icon: "🌿" },
    { nombre: "Calathea", categoria: "interior", precios: { pequeña: 35, mediana: 60, grande: 95 }, icon: "🍃" },
    
    // Plantas de Exterior
    { nombre: "Geranio", categoria: "exterior", precios: { pequeña: 20, mediana: 35, grande: 60 }, icon: "🌺" },
    { nombre: "Lavanda", categoria: "exterior", precios: { pequeña: 25, mediana: 40, grande: 70 }, icon: "💜" },
    { nombre: "Rosal", categoria: "exterior", precios: { pequeña: 30, mediana: 55, grande: 90 }, icon: "🌹" },
    { nombre: "Jazmín", categoria: "exterior", precios: { pequeña: 28, mediana: 48, grande: 80 }, icon: "🌼" },
    { nombre: "Bugambilia", categoria: "exterior", precios: { pequeña: 35, mediana: 60, grande: 100 }, icon: "🌸" },
    
    // Suculentas y Cactus
    { nombre: "Aloe Vera", categoria: "suculenta", precios: { pequeña: 15, mediana: 28, grande: 50 }, icon: "🌵" },
    { nombre: "Echeveria", categoria: "suculenta", precios: { pequeña: 12, mediana: 22, grande: 40 }, icon: "🪴" },
    { nombre: "Cactus San Pedro", categoria: "suculenta", precios: { pequeña: 20, mediana: 38, grande: 65 }, icon: "🌵" },
    { nombre: "Haworthia", categoria: "suculenta", precios: { pequeña: 18, mediana: 30, grande: 55 }, icon: "🌿" },
    { nombre: "Crassula", categoria: "suculenta", precios: { pequeña: 15, mediana: 25, grande: 45 }, icon: "🪴" },
    
    // Plantas Decorativas
    { nombre: "Orquídea", categoria: "decorativa", precios: { pequeña: 45, mediana: 80, grande: 140 }, icon: "🌺" },
    { nombre: "Anturio", categoria: "decorativa", precios: { pequeña: 35, mediana: 60, grande: 100 }, icon: "❤️" },
    { nombre: "Helecho", categoria: "decorativa", precios: { pequeña: 25, mediana: 45, grande: 75 }, icon: "🌿" },
    { nombre: "Bambú de la Suerte", categoria: "decorativa", precios: { pequeña: 20, mediana: 35, grande: 60 }, icon: "🎋" },
    { nombre: "Lirio de Paz", categoria: "decorativa", precios: { pequeña: 30, mediana: 55, grande: 90 }, icon: "🕊️" }
];

// ============================================
// VARIABLES GLOBALES
// ============================================
let todosLosProductos = [];
let filtroActual = 'all';

// ============================================
// MENÚ HAMBURGUESA
// ============================================
function inicializarMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menú
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function inicializarNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    });
}

// ============================================
// CONTADOR ANIMADO (HERO STATS)
// ============================================
function animarContadores() {
    const contadores = document.querySelectorAll('.stat-number');
    
    contadores.forEach(contador => {
        const valorFinal = parseInt(contador.dataset.valor);
        const duracion = 2000;
        const incremento = valorFinal / (duracion / 16);
        let valorActual = 0;
        
        const actualizar = () => {
            valorActual += incremento;
            if (valorActual < valorFinal) {
                contador.textContent = Math.floor(valorActual);
                requestAnimationFrame(actualizar);
            } else {
                contador.textContent = valorFinal + (valorFinal === 100 ? '%' : '+');
            }
        };
        
        actualizar();
    });
}

// ============================================
// GENERAR PRODUCTOS
// ============================================
function generarProductos() {
    const grid = document.getElementById('productosGrid');
    if (!grid) return;
    
    const tamanos = ['pequeña', 'mediana', 'grande'];
    todosLosProductos = [];
    
    plantas.forEach((planta, index) => {
        tamanos.forEach(tamano => {
            const producto = {
                ...planta,
                tamano: tamano,
                precio: planta.precios[tamano],
                id: `${planta.nombre}-${tamano}-${index}`
            };
            todosLosProductos.push(producto);
        });
    });
    
    renderizarProductos(todosLosProductos);
}

// ============================================
// RENDERIZAR PRODUCTOS
// ============================================
function renderizarProductos(productos) {
    const grid = document.getElementById('productosGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    productos.forEach((producto, index) => {
        const card = document.createElement('div');
        card.className = 'producto-card';
        card.style.animationDelay = `${index * 0.05}s`;
        card.dataset.categoria = producto.categoria;
        
        const tamanoCapital = producto.tamano.charAt(0).toUpperCase() + producto.tamano.slice(1);
        
        card.innerHTML = `
            <div class="producto-imagen">${producto.icon}</div>
            <div class="producto-info">
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <p class="producto-tamano">Tamaño: ${tamanoCapital}</p>
                <p class="producto-precio">S/ ${producto.precio}</p>
                <p class="producto-stock">📦 Stock: 5 unidades</p>
                <a href="https://wa.link/7qs37m" class="btn-comprar">
                    🛒 Comprar por WhatsApp
                </a>
            </div>
        `;
        
        grid.appendChild(card);
    });
    
    activarObservador();
}

// ============================================
// SISTEMA DE FILTROS
// ============================================
function inicializarFiltros() {
    const botonesFiltro = document.querySelectorAll('.filtro-btn');
    
    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', () => {
            // Remover clase active
            botonesFiltro.forEach(btn => btn.classList.remove('active'));
            boton.classList.add('active');
            
            const filtro = boton.dataset.filter;
            filtroActual = filtro;
            filtrarProductos(filtro);
        });
    });
}

function filtrarProductos(categoria) {
    const productos = document.querySelectorAll('.producto-card');
    
    productos.forEach((producto, index) => {
        const categoriaProducto = producto.dataset.categoria;
        
        if (categoria === 'all' || categoriaProducto === categoria) {
            producto.style.display = 'block';
            producto.style.animation = 'none';
            setTimeout(() => {
                producto.style.animation = `fadeInUp 0.6s ease ${index * 0.05}s forwards`;
            }, 10);
        } else {
            producto.style.display = 'none';
        }
    });
}

// ============================================
// CATEGORÍAS - SCROLL Y FILTRO
// ============================================
function inicializarCategorias() {
    const categorias = document.querySelectorAll('.categoria-card');
    
    categorias.forEach(categoria => {
        categoria.addEventListener('click', () => {
            const categoriaData = categoria.dataset.category;
            
            // Scroll al catálogo
            document.getElementById('catalogo')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Filtrar después del scroll
            setTimeout(() => {
                const botonFiltro = document.querySelector(`[data-filter="${categoriaData}"]`);
                botonFiltro?.click();
            }, 800);
        });
    });
}

// ============================================
// INTERSECTION OBSERVER - ANIMACIONES
// ============================================
function activarObservador() {
    const opciones = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = '1';
                
                // Animación especial para testimonios destacados
                if (entrada.target.classList.contains('testimonio-destacado')) {
                    entrada.target.style.animation = 'scaleIn 0.8s ease forwards';
                } else {
                    entrada.target.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            }
        });
    }, opciones);
    
    // Observar elementos
    const elementos = document.querySelectorAll(`
        .producto-card,
        .categoria-card,
        .beneficio-item,
        .testimonio-card,
        .promo-container,
        .section-header
    `);
    
    elementos.forEach(el => observador.observe(el));
}

// ============================================
// SCROLL SUAVE
// ============================================
function inicializarScrollSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const elemento = document.querySelector(href);
                if (elemento) {
                    elemento.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ============================================
// PARALLAX EN HERO
// ============================================
function inicializarParallax() {
    const heroImage = document.querySelector('.hero-image');
    if (!heroImage) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                if (scrolled < window.innerHeight) {
                    heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ============================================
// BOTÓN WHATSAPP FLOTANTE
// ============================================
function inicializarBotonWhatsApp() {
    const boton = document.querySelector('.whatsapp-float');
    if (!boton) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            boton.style.opacity = '1';
            boton.style.transform = 'scale(1)';
        } else {
            boton.style.opacity = '0.9';
            boton.style.transform = 'scale(0.9)';
        }
    });
}

// ============================================
// DETECCIÓN DE DISPOSITIVO
// ============================================
function esMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// ============================================
// AJUSTES RESPONSIVE
// ============================================
function ajustesResponsive() {
    const isMobile = esMobile();
    
    if (isMobile) {
        // Ajustes específicos para móviles
        const hero = document.querySelector('.hero');
        if (hero && window.innerWidth < 768) {
            hero.style.minHeight = '85vh';
        }
    }
}

// ============================================
// LAZY LOADING DE IMÁGENES
// ============================================
function inicializarLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('cargada');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        const imagenes = document.querySelectorAll('img[data-src]');
        imagenes.forEach(img => imageObserver.observe(img));
    }
}

// ============================================
// EFECTOS DE HOVER MEJORADOS
// ============================================
function mejorarEfectosHover() {
    // Efecto ripple en botones
    const botones = document.querySelectorAll('.btn-comprar, .btn-hero-primary, .btn-cta');
    
    botones.forEach(boton => {
        boton.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 20px;
                height: 20px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: translate(-50%, -50%) scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ============================================
// ANIMACIÓN DE ENTRADA DE PÁGINA
// ============================================
function animarEntrada() {
    document.body.style.opacity = '0';
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
}

// ============================================
// PREVENIR ZOOM EN IOS
// ============================================
function prevenirZoomIOS() {
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
}

// ============================================
// INICIALIZACIÓN PRINCIPAL
// ============================================
function inicializar() {
    console.log('🌿 Iniciando Plantas Lima...');
    
    // Inicializar componentes
    inicializarMenu();
    inicializarNavbarScroll();
    generarProductos();
    inicializarFiltros();
    inicializarCategorias();
    inicializarScrollSuave();
    inicializarBotonWhatsApp();
    inicializarLazyLoading();
    mejorarEfectosHover();
    ajustesResponsive();
    animarEntrada();
    
    // Parallax solo en desktop
    if (!esMobile()) {
        inicializarParallax();
    }
    
    // Prevenir zoom en iOS
    prevenirZoomIOS();
    
    // Animar contadores cuando sean visibles
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animarContadores();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(heroStats);
    }
    
    console.log('✅ Sitio cargado correctamente');
}

// ============================================
// EVENTOS DE CARGA
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializar);
} else {
    inicializar();
}

// Ajustar en resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ajustesResponsive();
    }, 250);
});

// ============================================
// API GLOBAL (OPCIONAL)
// ============================================
window.PlantasLima = {
    plantas,
    todosLosProductos,
    filtrarProductos,
    generarProductos
};