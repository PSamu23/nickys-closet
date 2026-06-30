/* ============================================
   NICKYS CLOSET - JavaScript
   Tabs, Galeria dinamica, Modal, WhatsApp
   ============================================ */

const WHATSAPP_NUMBER = "50487933297";
const WHATSAPP_MESSAGE = "!Hola! Me interesa este producto: ";

const carteras = [
    { id: 1, nombre: "Diana", descripcion: "Bolso Casual.", imagen: "images/cartera1.jpg", precio: "Consultar" },
    { id: 2, nombre: "Luna", descripcion: "Bolso Casual.", imagen: "images/cartera2.jpg", precio: "Consultar" },
    { id: 3, nombre: "Aurora", descripcion: "Bolso Casual.", imagen: "images/cartera3.jpg", precio: "Consultar" },
    { id: 4, nombre: "Valentina", descripcion: "Bolso Casual.", imagen: "images/cartera4.jpg", precio: "Consultar" },
    { id: 5, nombre: "Isabella", descripcion: "Bolso Casual.", imagen: "images/cartera5.jpeg", precio: "Consultar" },
    { id: 6, nombre: "Sofia", descripcion: "Bolso Casual.", imagen: "images/cartera6.jpeg", precio: "Consultar" }
];

const perfumes = [    
    { id: 1, nombre: "MOONLIGHT", descripcion: "Ariana Grande", imagen: "images/losion1.jpeg", precio: "Consultar" },
    { id: 2, nombre: "Prada", descripcion: "Loción.", imagen: "images/losion2.jpg", precio: "Consultar" },
    { id: 3, nombre: "La vida es bella", descripcion: "Loción.", imagen: "images/losion3.jpg", precio: "Consultar" },
    { id: 4, nombre: "Luna", descripcion: "Loción.", imagen: "images/losion4.jpg", precio: "Consultar" },
    { id: 5, nombre: "Dior Savage", descripcion: "Loción.", imagen: "images/losion5.jpg", precio: "Consultar" },
    { id: 6, nombre: "Invictus", descripcion: "Loción.", imagen: "images/losion6.jpg", precio: "Consultar" },
    { id: 7, nombre: "Calvin Klein", descripcion: "Loción.", imagen: "images/losion7.jpg", precio: "Consultar" },
    { id: 8, nombre: "212", descripcion: "Loción.", imagen: "images/losion8.jpg", precio: "Consultar" },
    { id: 9, nombre: "Victorias Secrets", descripcion: "Loción.", imagen: "images/losion9.jpg", precio: "Consultar" },
    { id: 10, nombre: "Victorias Secrets", descripcion: "Loción.", imagen: "images/losion10.jpg", precio: "Consultar" },
    { id: 11, nombre: "Victorias Secrets", descripcion: "Loción.", imagen: "images/losion11.jpg", precio: "Consultar" },
    { id: 12, nombre: "212 VIP", descripcion: "Loción.", imagen: "images/losion12.jpg", precio: "Consultar" },
    { id: 13, nombre: "Luna", descripcion: "Loción.", imagen: "images/losion13.jpg", precio: "Consultar" },
    { id: 14, nombre: "Luna", descripcion: "Loción.", imagen: "images/losion14.jpg", precio: "Consultar" },
    { id: 15, nombre: "Luna", descripcion: "Loción.", imagen: "images/losion15.jpg", precio: "Consultar" },
    { id: 16, nombre: "Luna", descripcion: "Loción.", imagen: "images/losion16.jpg", precio: "Consultar" },
    { id: 17, nombre: "Luna", descripcion: "Loción.", imagen: "images/losion17.jpg", precio: "Consultar" },
    { id: 18, nombre: "Cloude", descripcion: "Ariana Grande.", imagen: "images/losion18.jpg", precio: "Consultar" },
    { id: 19, nombre: "Cloud SPLASRH", descripcion: "Ariana Grande.", imagen: "images/losion19.jpg", precio: "Consultar" },
    { id: 20, nombre: "Candy", descripcion: "Ariana Grande.", imagen: "images/losion20.jpg", precio: "Consultar" },
    


];

const skincare = [    { id: 4, nombre: "Valentina", descripcion: "Bolso Casual.", imagen: "images/cartera4.jpg", precio: "Consultar" },
    { id: 5, nombre: "Isabella", descripcion: "Bolso Casual.", imagen: "images/cartera5.jpeg", precio: "Consultar" },];
const maquillaje = [    { id: 4, nombre: "Valentina", descripcion: "Bolso Casual.", imagen: "images/cartera4.jpg", precio: "Consultar" },
    { id: 5, nombre: "Isabella", descripcion: "Bolso Casual.", imagen: "images/cartera5.jpeg", precio: "Consultar" },];

const categoriasConfig = {
    carteras: { data: carteras, titulo: 'Nuestra <span class="highlight">Coleccion</span>', icono: "fa-gem", sub: "Toca cualquier cartera para ver mas detalles" },
    perfumes: { data: perfumes, titulo: 'Nuestros <span class="highlight">Perfumes</span>', icono: "fa-spray-can-sparkles", sub: "Toca cualquier perfume para ver mas detalles" },
    skincare: { data: skincare, titulo: 'Nuestro <span class="highlight">Skincare</span>', icono: "fa-hand-sparkles", sub: "Toca cualquier producto para ver mas detalles" },
    maquillaje: { data: maquillaje, titulo: 'Nuestro <span class="highlight">Maquillaje</span>', icono: "fa-paint-brush", sub: "Toca cualquier producto para ver mas detalles" }
};

function renderizarGaleria(array) {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    grid.innerHTML = "";
    if (!array || array.length === 0) {
        grid.innerHTML = '<div class="empty-msg"><i class="fas fa-box-open"></i><p>Proximamente...</p></div>';
        return;
    }
    array.forEach(function(item, index) {
        const card = document.createElement("div");
        card.className = "card";
        card.setAttribute("data-id", item.id);
        card.style.animationDelay = (index * 0.1) + "s";
        card.innerHTML = '<div class="card-image-wrapper">' +
            '<img src="' + item.imagen + '" alt="' + item.nombre + '" loading="lazy"' +
            ' onerror="this.src=&#39;https://via.placeholder.com/400x533/f5f0eb/d4a574?text=' + encodeURIComponent(item.nombre) + '&#39;">' +
            '<div class="card-glass"></div></div>' +
            '<div class="card-overlay"><h3>' + item.nombre + '</h3><p>' + item.precio + '</p></div>';
        card.addEventListener("click", function() { abrirModal(item); });
        grid.appendChild(card);
    });
}

function cambiarCategoria(categoria) {
    document.querySelectorAll(".categoria-card").forEach(function(btn) {
        btn.classList.remove("active");
    });
    var btnActivo = document.querySelector('[data-categoria="' + categoria + '"]');
    if (btnActivo) btnActivo.classList.add("active");
    var config = categoriasConfig[categoria];
    if (!config) return;
    document.getElementById("categoriaTitulo").innerHTML = config.titulo;
    document.getElementById("categoriaIcono").className = "fas " + config.icono;
    document.getElementById("categoriaSub").textContent = config.sub;
    renderizarGaleria(config.data);
}

function abrirModal(producto) {
    document.getElementById("modalImage").src = producto.imagen;
    document.getElementById("modalImage").alt = producto.nombre;
    document.getElementById("modalTitle").textContent = producto.nombre;
    document.getElementById("modalDescription").textContent = producto.descripcion;
    var msg = encodeURIComponent(WHATSAPP_MESSAGE + producto.nombre + " - " + window.location.href);
    document.getElementById("whatsappLink").href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + msg;
    document.getElementById("modalOverlay").classList.add("active");
    document.body.style.overflow = "hidden";
}

function cerrarModal() {
    document.getElementById("modalOverlay").classList.remove("active");
    document.body.style.overflow = "";
}

document.getElementById("modalClose").addEventListener("click", cerrarModal);
document.getElementById("modalOverlay").addEventListener("click", function(e) {
    if (e.target === this) cerrarModal();
});
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") cerrarModal();
});

document.querySelectorAll(".categoria-card").forEach(function(btn) {
    btn.addEventListener("click", function() {
        cambiarCategoria(this.getAttribute("data-categoria"));
    });
});

/* === AUTO SCROLL DE CATEGORÍAS === */
function initAutoScrollCategorias() {
    var grid = document.getElementById("categoriasGrid");
    if (!grid) return;

    var isPaused = false;
    var direction = 1;
    var animId = null;
    var scrollTimeout = null;
    var speed = 0.5;

    // Solo activar en móvil (con scroll horizontal)
    var isMobile = window.matchMedia("(max-width: 767px)");
    if (!isMobile.matches) {
        // En desktop: animación float sutil en cada tarjeta
        document.querySelectorAll(".categoria-card").forEach(function(card) {
            card.style.animation = "categoriaFloat 3s ease-in-out infinite";
        });
        return;
    }

    function step() {
        if (!isPaused) {
            var maxScroll = grid.scrollWidth - grid.clientWidth;
            if (maxScroll <= 0) {
                animId = requestAnimationFrame(step);
                return;
            }

            if (direction === 1) {
                grid.scrollLeft += speed;
                if (grid.scrollLeft >= maxScroll - 2) {
                    direction = -1;
                }
            } else {
                grid.scrollLeft -= speed;
                if (grid.scrollLeft <= 2) {
                    direction = 1;
                }
            }
        }
        animId = requestAnimationFrame(step);
    }

    // Pausar al interactuar, reanudar después de 2.5s
    function handlePause() {
        isPaused = true;
        if (scrollTimeout) clearTimeout(scrollTimeout);
    }
    function handleResume() {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            isPaused = false;
        }, 2500);
    }

    grid.addEventListener("mouseenter", handlePause);
    grid.addEventListener("mouseleave", handleResume);
    grid.addEventListener("touchstart", handlePause);
    grid.addEventListener("touchend", handleResume);

    // Pausar también cuando el usuario hace scroll manual
    grid.addEventListener("scroll", function() {
        isPaused = true;
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            isPaused = false;
        }, 2500);
    });

    // Reaccionar al cambio de tamaño de pantalla
    isMobile.addEventListener("change", function(e) {
        if (e.matches) {
            // Vuelve a móvil - reiniciar animación
            if (animId) cancelAnimationFrame(animId);
            document.querySelectorAll(".categoria-card").forEach(function(card) {
                card.style.animation = "";
            });
            direction = 1;
            isPaused = false;
            animId = requestAnimationFrame(step);
        } else {
            // Cambia a desktop - detener scroll y aplicar float
            if (animId) cancelAnimationFrame(animId);
            document.querySelectorAll(".categoria-card").forEach(function(card) {
                card.style.animation = "categoriaFloat 3s ease-in-out infinite";
            });
        }
    });

    animId = requestAnimationFrame(step);
}

document.addEventListener("DOMContentLoaded", function() {
    cambiarCategoria("carteras");
    initAutoScrollCategorias();
});

var styleAnim = document.createElement("style");
styleAnim.textContent = ".card { opacity: 0; transform: translateY(30px); animation: fadeInUp 0.5s ease forwards; }";
styleAnim.textContent += " @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }";
styleAnim.textContent += " .empty-msg { text-align: center; padding: 3rem 1rem; color: #8a8a8a; }";
styleAnim.textContent += " .empty-msg i { font-size: 3rem; margin-bottom: 1rem; color: #e8c9a8; }";
styleAnim.textContent += " .empty-msg p { font-family: 'Playfair Display', serif; font-size: 1.2rem; }";
styleAnim.textContent += " @keyframes categoriaFloat { 0%,100%{ transform: translateY(0px); } 50%{ transform: translateY(-4px); } }";
document.head.appendChild(styleAnim);

document.querySelector(".btn-primary")?.addEventListener("click", function(e) {
    e.preventDefault();
    var target = document.querySelector("#categorias");
    if (target) target.scrollIntoView({ behavior: "smooth" });
});
