/* ============================================
   COLI CARTERAS - JavaScript
   Funcionalidad: Galería dinámica, Modal, WhatsApp
   ============================================ */

// ============================================
// CONFIGURACIÓN - ¡EDITA AQUÍ TUS CARTERAS!
// ============================================

// Número de WhatsApp (con código de país, sin + ni espacios)
const WHATSAPP_NUMBER = "50487933297"; // Cambia este número

// Mensaje base para WhatsApp
const WHATSAPP_MESSAGE = "¡Hola! Me interesa esta cartera: ";

// ============================================
// LISTA DE CARTERAS (Array de objetos)
// ============================================
// Para agregar más carteras, solo añade más objetos a este array.
// Las imágenes deben estar en la carpeta "images/" con formato .jpg o .webp
// ============================================

const carteras = [
    {
        id: 1,
        nombre: "Diana",
        descripcion: "Cartera elegante con acabado en cuero genuino y detalles dorados. Perfecta para ocasiones especiales.",
        imagen: "images/cartera1.jpg",
        precio: "Consultar"
    },
    {
        id: 2,
        nombre: "Luna",
        descripcion: "Bolso mediano con diseño minimalista y cierre magnético. Ideal para el día a día.",
        imagen: "images/cartera2.jpg",
        precio: "Consultar"
    },
    {
        id: 3,
        nombre: "Aurora",
        descripcion: "Cartera de mano con estampado floral y asa removible. Elegancia en cada detalle.",
        imagen: "images/cartera3.jpg",
        precio: "Consultar"
    },
    {
        id: 4,
        nombre: "Valentina",
        descripcion: "Mochila de cuero suave con múltiples compartimentos. Comodidad y estilo.",
        imagen: "images/cartera4.jpg",
        precio: "Consultar"
    },
    {
        id: 5,
        nombre: "Isabella",
        descripcion: "Cartera cruzada con cadena dorada y acabado brillante. Tendencias modernas.",
        imagen: "images/cartera5.jpg",
        precio: "Consultar"
    },
    {
        id: 6,
        nombre: "Sofía",
        descripcion: "Bolso grande tipo shopper con diseño geométrico. Espaciosa y funcional.",
        imagen: "images/cartera6.jpg",
        precio: "Consultar"
    },
    {
        id: 7,
        nombre: "Camila",
        descripcion: "Cartera acolchonada con asa top handle. Suave al tacto y muy elegante.",
        imagen: "images/cartera7.jpg",
        precio: "Consultar"
    },
    {
        id: 8,
        nombre: "Victoria",
        descripcion: "Clutch con pedrería y cierre de broche. La pieza estrella para tus eventos.",
        imagen: "images/cartera8.jpg",
        precio: "Consultar"
    }
];

// ============================================
// FUNCIÓN PARA GENERAR LAS TARJETAS (usando forEach)
// ============================================

function renderizarCarteras() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    // Limpiar el grid
    galleryGrid.innerHTML = '';

    // Usando forEach para recorrer el array de carteras
    carteras.forEach(function(cartera, index) {
        // Crear el elemento de la tarjeta
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-id', cartera.id);
        
        // Agregar un pequeño retraso en la animación de entrada
        card.style.animationDelay = (index * 0.1) + 's';

        // Construir el HTML interno de la tarjeta
        card.innerHTML = `
            <div class="card-image-wrapper">
                <img 
                    src="${cartera.imagen}" 
                    alt="${cartera.nombre}" 
                    loading="lazy"
                    onerror="this.src='https://via.placeholder.com/400x533/f5f0eb/d4a574?text=${encodeURIComponent(cartera.nombre)}'"
                >
                <div class="card-glass"></div>
            </div>
            <div class="card-overlay">
                <h3>${cartera.nombre}</h3>
                <p>${cartera.precio}</p>
            </div>
        `;

        // Agregar evento click para abrir el modal
        card.addEventListener('click', function() {
            abrirModal(cartera);
        });

        // Agregar la tarjeta al grid
        galleryGrid.appendChild(card);
    });
}

// ============================================
// FUNCIÓN PARA ABRIR EL MODAL
// ============================================

function abrirModal(cartera) {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const whatsappLink = document.getElementById('whatsappLink');

    // Actualizar contenido del modal
    modalImage.src = cartera.imagen;
    modalImage.alt = cartera.nombre;
    modalTitle.textContent = cartera.nombre;
    modalDescription.textContent = cartera.descripcion;

    // Generar enlace de WhatsApp con el nombre de la cartera
    const mensaje = encodeURIComponent(WHATSAPP_MESSAGE + cartera.nombre + " - " + window.location.href);
    whatsappLink.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`;

    // Mostrar el modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ============================================
// FUNCIÓN PARA CERRAR EL MODAL
// ============================================

function cerrarModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// EVENT LISTENERS
// ============================================

// Cerrar modal con el botón X
document.getElementById('modalClose').addEventListener('click', cerrarModal);

// Cerrar modal haciendo clic fuera del contenido
document.getElementById('modalOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
        cerrarModal();
    }
});

// Cerrar modal con la tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        cerrarModal();
    }
});

// ============================================
// INICIALIZAR LA GALERÍA
// ============================================

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    renderizarCarteras();
    
    // Animación de entrada para las tarjetas
    const cards = document.querySelectorAll('.card');
    cards.forEach(function(card, index) {
        setTimeout(function() {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 80));
    });
});

// Agregar estilos de animación de entrada dinámicamente
const styleAnimacion = document.createElement('style');
styleAnimacion.textContent = `
    .card {
        opacity: 0;
        transform: translateY(30px);
        animation: fadeInUp 0.5s ease forwards;
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(styleAnimacion);

// ============================================
// FUNCIÓN EXTRA: Scroll suave para el botón "Ver Colección"
// ============================================

document.querySelector('.btn-primary')?.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector('#galeria');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
    }
});
