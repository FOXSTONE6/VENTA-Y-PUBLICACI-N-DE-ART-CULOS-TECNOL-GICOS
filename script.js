function toggleMenu() {
    document.getElementById("menu").classList.toggle("activo");
}

function abrirLogin() {
    document.getElementById("loginModal").style.display = "block";
}

function cerrarLogin() {
    document.getElementById("loginModal").style.display = "none";
}

function iniciarSesion(event) {
    event.preventDefault();

    const usuario = document.getElementById("loginUsuario").value;
    const password = document.getElementById("loginPassword").value;
    const mensaje = document.getElementById("mensajeLogin");

    if (usuario === "admin" && password === "1234") {
        mensaje.style.color = "green";
        mensaje.textContent = "Inicio de sesión correcto";
        setTimeout(() => {
            cerrarLogin();
            mensaje.textContent = "";
        }, 1200);
    } else {
        mensaje.style.color = "red";
        mensaje.textContent = "Usuario o contraseña incorrectos";
    }
}

window.onclick = function(event) {
    const modal = document.getElementById("loginModal");
    if (event.target === modal) {
        cerrarLogin();
    }
}

/* ================= MENÚ ================= */
function toggleMenu() {
    document.getElementById("menu").classList.toggle("activo");
}

/* ================= LOGIN ================= */
function abrirLogin() {
    document.getElementById("loginModal").style.display = "block";
}

function cerrarLogin() {
    document.getElementById("loginModal").style.display = "none";
}

function iniciarSesion(event) {
    event.preventDefault();

    const usuario = document.getElementById("loginUsuario").value;
    const password = document.getElementById("loginPassword").value;
    const mensaje = document.getElementById("mensajeLogin");

    if (usuario === "admin" && password === "1234") {
        mensaje.style.color = "green";
        mensaje.textContent = "Inicio de sesión correcto";
        setTimeout(() => {
            cerrarLogin();
            mensaje.textContent = "";
        }, 1200);
    } else {
        mensaje.style.color = "red";
        mensaje.textContent = "Usuario o contraseña incorrectos";
    }
}

window.onclick = function(event) {
    const modal = document.getElementById("loginModal");
    if (event.target === modal) {
        cerrarLogin();
    }
};



function irTienda() {
    // Si tienes una sección con id="tienda"
    const tienda = document.getElementById("tienda");

    if (tienda) {
        tienda.scrollIntoView({
            behavior: "smooth"
        });
    }
}


/* ================= CARRUSEL CATEGORÍAS ================= */
const trackCategorias = document.getElementById("trackCategorias");
const carruselCategorias = document.getElementById("carruselCategorias");

let velocidadCarrusel = 1;
let animacionCarrusel;
let pausado = false;

/* Duplicar tarjetas para efecto infinito */
function duplicarCategorias() {
    const categoriasOriginales = Array.from(trackCategorias.children);

    categoriasOriginales.forEach((item) => {
        const clon = item.cloneNode(true);
        trackCategorias.appendChild(clon);
    });
}

/* Movimiento continuo */
function moverCarrusel() {
    let posicionX = 0;

    function animar() {
        if (!pausado) {
            posicionX -= velocidadCarrusel;

            const mitadTrack = trackCategorias.scrollWidth / 2;

            if (Math.abs(posicionX) >= mitadTrack) {
                posicionX = 0;
            }

            trackCategorias.style.transform = `translateX(${posicionX}px)`;
        }

        animacionCarrusel = requestAnimationFrame(animar);
    }

    animar();
}

/* Pausar al entrar con mouse */
function activarEventosCarrusel() {
    carruselCategorias.addEventListener("mouseenter", () => {
        pausado = true;
    });

    carruselCategorias.addEventListener("mouseleave", () => {
        pausado = false;
    });
}

/* Resaltado con JS */
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

/* Reiniciar hover en clones */
function reiniciarEventosCategorias() {
    activarHoverCategorias();
}

/* Inicialización */
duplicarCategorias();
moverCarrusel();
activarEventosCarrusel();
reiniciarEventosCategorias();