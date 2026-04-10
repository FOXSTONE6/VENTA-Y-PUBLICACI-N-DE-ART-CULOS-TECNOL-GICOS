/* ================= MENÚ RESPONSIVE ================= */
// Abre o cierra el menú en móviles agregando o quitando la clase "activo"
function toggleMenu() {
    document.getElementById("menu").classList.toggle("activo");
}


/* ================= MODAL LOGIN ================= */
// Muestra la ventana modal de inicio de sesión
function abrirLogin() {
    document.getElementById("loginModal").style.display = "block";
}

// Oculta la ventana modal de inicio de sesión
function cerrarLogin() {
    document.getElementById("loginModal").style.display = "none";
}

// Valida el inicio de sesión con credenciales simuladas
function iniciarSesion(event) {
    event.preventDefault(); // Evita que el formulario recargue la página

    const usuario = document.getElementById("loginUsuario").value;
    const password = document.getElementById("loginPassword").value;
    const mensaje = document.getElementById("mensajeLogin");

    // Validación simple de usuario y contraseña
    if (usuario === "admin" && password === "1234") {
        mensaje.style.color = "green";
        mensaje.textContent = "Inicio de sesión correcto";

        // Cierra el modal después de un momento
        setTimeout(() => {
            cerrarLogin();
            mensaje.textContent = "";
        }, 1200);
    } else {
        mensaje.style.color = "red";
        mensaje.textContent = "Usuario o contraseña incorrectos";
    }
}

// Cierra el modal si se hace clic fuera del contenido
window.onclick = function(event) {
    const modal = document.getElementById("loginModal");
    if (event.target === modal) {
        cerrarLogin();
    }
};


/* ================= BOTÓN HERO ================= */
// Desplaza suavemente a la sección tienda
function irTienda() {
    const tienda = document.getElementById("tienda");

    if (tienda) {
        tienda.scrollIntoView({
            behavior: "smooth"
        });
    }
}


/* ================= CARRUSEL DE CATEGORÍAS ================= */
const trackCategorias = document.getElementById("trackCategorias");
const carruselCategorias = document.getElementById("carruselCategorias");

let velocidadCarrusel = 1; // Velocidad de desplazamiento
let animacionCarrusel;     // Guarda la animación
let pausado = false;       // Controla si el carrusel está detenido


// Duplica las categorías para crear efecto infinito
function duplicarCategorias() {
    const categoriasOriginales = Array.from(trackCategorias.children);

    categoriasOriginales.forEach((item) => {
        const clon = item.cloneNode(true);
        trackCategorias.appendChild(clon);
    });
}


// Mueve el carrusel automáticamente de forma continua
function moverCarrusel() {
    let posicionX = 0;

    function animar() {
        if (!pausado) {
            posicionX -= velocidadCarrusel;

            const mitadTrack = trackCategorias.scrollWidth / 2;

            // Reinicia la posición para que parezca infinito
            if (Math.abs(posicionX) >= mitadTrack) {
                posicionX = 0;
            }

            trackCategorias.style.transform = `translateX(${posicionX}px)`;
        }

        animacionCarrusel = requestAnimationFrame(animar);
    }

    animar();
}


// Pausa el carrusel cuando el mouse entra y lo reanuda al salir
function activarEventosCarrusel() {
    carruselCategorias.addEventListener("mouseenter", () => {
        pausado = true;
    });

    carruselCategorias.addEventListener("mouseleave", () => {
        pausado = false;
    });
}


// Resalta la tarjeta de categoría al pasar el mouse
function activarHoverCategorias() {
    const categorias = document.querySelectorAll(".categoria");

    categorias.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            categorias.forEach((c) => c.classList.remove("activa"));
            card.classList.add("activa");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("activa");
        });
    });
}


// Aplica nuevamente eventos a las tarjetas clonadas
function reiniciarEventosCategorias() {
    activarHoverCategorias();
}


/* ================= INICIALIZACIÓN ================= */
// Ejecuta las funciones al cargar la página
duplicarCategorias();
moverCarrusel();
activarEventosCarrusel();
reiniciarEventosCategorias();