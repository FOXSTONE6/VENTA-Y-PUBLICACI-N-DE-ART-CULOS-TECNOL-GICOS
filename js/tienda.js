/* =========================
   MENÚ RESPONSIVE
========================= */
function toggleMenu() {
    document.getElementById("menu").classList.toggle("activo");
}

/* =========================
   PRODUCTOS DE TIENDA
========================= */
const productos = [
    {
        id: 1,
        nombre: "Laptop Lenovo IdeaPad 5",
        descripcion: "Laptop ideal para oficina, estudios y multitarea con excelente rendimiento.",
        precio: 2899.00,
        categoria: "laptops",
        imagen: "img/productos/laptop1.png"
    },
    {
        id: 2,
        nombre: "Samsung Galaxy A55",
        descripcion: "Smartphone moderno con excelente batería, pantalla AMOLED y gran cámara.",
        precio: 1699.00,
        categoria: "celulares",
        imagen: "img/productos/celular1.png"
    },
    {
        id: 3,
        nombre: "Mouse Logitech Inalámbrico",
        descripcion: "Mouse ergonómico y preciso para trabajo, estudio y productividad diaria.",
        precio: 89.00,
        categoria: "accesorios",
        imagen: "img/productos/mouse1.png"
    },
    {
        id: 4,
        nombre: "Monitor LG 24 Pulgadas",
        descripcion: "Monitor Full HD con gran nitidez para oficina, estudio o entretenimiento.",
        precio: 649.00,
        categoria: "componentes",
        imagen: "img/productos/monitor1.png"
    },
    {
        id: 5,
        nombre: "Laptop HP Pavilion 15",
        descripcion: "Equipo potente con diseño elegante y excelente desempeño multitarea.",
        precio: 3299.00,
        categoria: "laptops",
        imagen: "img/productos/laptop2.png"
    },
    {
        id: 6,
        nombre: "Audífonos Bluetooth Sony",
        descripcion: "Audífonos inalámbricos con sonido envolvente y gran autonomía.",
        precio: 249.00,
        categoria: "accesorios",
        imagen: "img/productos/audifono1.png"
    }
];

/* =========================
   CARRITO PERSISTENTE
========================= */
let carrito = JSON.parse(localStorage.getItem("carritoTecnoMarket")) || [];

/* =========================
   MOSTRAR PRODUCTOS
========================= */
function mostrarProductos(lista) {
    const contenedor = document.getElementById("listaProductos");
    const totalProductos = document.getElementById("totalProductos");

    contenedor.innerHTML = "";
    totalProductos.textContent = lista.length;

    if (lista.length === 0) {
        contenedor.innerHTML = `<p>No se encontraron productos.</p>`;
        return;
    }

    lista.forEach(producto => {
        contenedor.innerHTML += `
            <article class="producto-card">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>

                <div class="producto-info">
                    <span class="producto-categoria">${producto.categoria}</span>
                    <span class="producto-precio">S/ ${producto.precio.toFixed(2)}</span>
                </div>

                <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id})">
                    Agregar al carrito
                </button>
            </article>
        `;
    });
}

/* =========================
   FILTROS
========================= */
function aplicarFiltros() {
    const textoBusqueda = document.getElementById("buscadorProductos").value.toLowerCase();
    const categoria = document.getElementById("filtroCategoria").value;
    const orden = document.getElementById("ordenPrecio").value;

    let resultado = [...productos];

    if (categoria !== "todos") {
        resultado = resultado.filter(producto => producto.categoria === categoria);
    }

    if (textoBusqueda) {
        resultado = resultado.filter(producto =>
            producto.nombre.toLowerCase().includes(textoBusqueda) ||
            producto.descripcion.toLowerCase().includes(textoBusqueda)
        );
    }

    if (orden === "menor") {
        resultado.sort((a, b) => a.precio - b.precio);
    } else if (orden === "mayor") {
        resultado.sort((a, b) => b.precio - a.precio);
    }

    mostrarProductos(resultado);
}

/* =========================
   AGREGAR AL CARRITO
========================= */
function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    const existente = carrito.find(item => item.id === idProducto);

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        });
    }

    guardarCarrito();
    renderCarrito();
}

/* =========================
   ELIMINAR UN PRODUCTO
   Si cantidad > 1, resta uno
   Si cantidad = 1, lo elimina
========================= */
function eliminarDelCarrito(idProducto) {
    const index = carrito.findIndex(item => item.id === idProducto);

    if (index !== -1) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad -= 1;
        } else {
            carrito.splice(index, 1);
        }
    }

    guardarCarrito();
    renderCarrito();
}

/* =========================
   VACIAR CARRITO COMPLETO
========================= */
function vaciarCarrito() {
    if (carrito.length === 0) {
        alert("El carrito ya está vacío.");
        return;
    }

    const confirmar = confirm("¿Deseas vaciar todo el carrito?");
    if (confirmar) {
        carrito = [];
        guardarCarrito();
        renderCarrito();
    }
}

/* =========================
   GUARDAR EN LOCALSTORAGE
========================= */
function guardarCarrito() {
    localStorage.setItem("carritoTecnoMarket", JSON.stringify(carrito));
}

/* =========================
   MOSTRAR CARRITO
========================= */
function renderCarrito() {
    const contenedor = document.getElementById("carritoItems");
    const total = document.getElementById("carritoTotal");
    const carritoCantidad = document.getElementById("carritoCantidad");

    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = `<p>Tu carrito está vacío.</p>`;
        total.textContent = "0.00";
        carritoCantidad.textContent = "0";
        return;
    }

    let totalFinal = 0;
    let totalItems = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        totalFinal += subtotal;
        totalItems += item.cantidad;

        contenedor.innerHTML += `
            <div class="carrito-item">
                <h4>${item.nombre}</h4>
                <p>Cantidad: ${item.cantidad}</p>
                <p>Precio unitario: S/ ${item.precio.toFixed(2)}</p>
                <p>Subtotal: S/ ${subtotal.toFixed(2)}</p>
                <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})">
                    Eliminar una unidad
                </button>
            </div>
        `;
    });

    total.textContent = totalFinal.toFixed(2);
    carritoCantidad.textContent = totalItems;
}

/* =========================
   ACCIÓN BOTÓN VER CARRITO
========================= */
function irAlCarrito() {
    window.location.href = "./carrito.html";
}

/* =========================
   EVENTOS
========================= */
document.getElementById("buscadorProductos").addEventListener("input", aplicarFiltros);
document.getElementById("filtroCategoria").addEventListener("change", aplicarFiltros);
document.getElementById("ordenPrecio").addEventListener("change", aplicarFiltros);

/* =========================
   INICIO
========================= */
mostrarProductos(productos);
renderCarrito();