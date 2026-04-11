/* =========================
   MENÚ RESPONSIVE
========================= */
function toggleMenu() {
    document.getElementById("menu").classList.toggle("activo");
}

/* =========================
   MOSTRAR / OCULTAR CONTRASEÑA
========================= */
function togglePassword() {
    const passwordInput = document.getElementById("password");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

/* =========================
   CARGAR USUARIO RECORDADO
========================= */
window.addEventListener("DOMContentLoaded", () => {
    const correoGuardado = localStorage.getItem("correoRecordado");

    if (correoGuardado) {
        document.getElementById("correo").value = correoGuardado;
        document.getElementById("recordar").checked = true;
    }
});

/* =========================
   LOGIN SIMULADO
   Luego se conectará con BD
========================= */
document.getElementById("formLogin").addEventListener("submit", function (e) {
    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();
    const recordar = document.getElementById("recordar").checked;
    const mensaje = document.getElementById("mensajeLogin");

    /* Credenciales temporales de prueba */
    const usuarioDemo = "admin@tecnomarket.com";
    const passwordDemo = "123456";

    if (correo === usuarioDemo && password === passwordDemo) {
        mensaje.style.color = "green";
        mensaje.textContent = "Inicio de sesión exitoso";

        if (recordar) {
            localStorage.setItem("correoRecordado", correo);
        } else {
            localStorage.removeItem("correoRecordado");
        }

        /* Simula sesión activa */
        localStorage.setItem("usuarioLogueado", JSON.stringify({
            correo: correo,
            rol: "admin"
        }));

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1200);

    } else {
        mensaje.style.color = "#d00000";
        mensaje.textContent = "Correo o contraseña incorrectos";
    }
});