class Producto {
    constructor(nombre, precio, imagen) {
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

const productos = [
    new Producto('Procesador Intel i7', 1200000, 'img/Intel.jpg'),
    new Producto('Tarjeta Gráfica NVIDIA GTX 3080', 3500000, 'img/3080.jpg'),
    new Producto('Placa Madre ASUS ROG Strix', 800000, 'img/h525.png'),
    new Producto('Memoria RAM Corsair 16GB DDR4', 400000, 'img/ram.webp'),
    new Producto('Disco Duro SSD Samsung 1TB', 600000, 'img/duro.webp'),
    new Producto('Teclado Mecánico Logitech G Pro', 500000, 'img/teclado.png'),
    new Producto('Mouse Inalámbrico Razer DeathAdder', 300000, 'img/mouse.jpg'),
    new Producto('Monitor Curvo Acer 27 pulgadas', 1200000, 'img/monitor.webp'),
    new Producto('Fuente de Poder EVGA 750W', 450000, 'img/fuente.jpg'),
    new Producto('Caja de PC NZXT H510', 700000, 'img/caja.jpg'),
    new Producto('Ventiladores RGB Corsair', 250000, 'img/sopla.webp'),
    new Producto('Webcam Logitech C920 HD', 80000, 'img/foto.webp'),
];

let carrito = [];

function agregarAlCarrito(producto) {
    const productoEnCarrito = new Producto(producto.nombre, parseFloat(producto.precio), producto.imagen);
    carrito.push(productoEnCarrito);
    actualizarCarrito();
}

function eliminarProducto(index) {
    const productoEliminado = carrito.splice(index, 1)[0];
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

function actualizarCarrito() {
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');

    cartList.innerHTML = '';

    let total = 0;

    carrito.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.nombre} - ${formatoMoneda(item.precio)}`;

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', () => {
            eliminarProducto(index);
        });

        listItem.appendChild(btnEliminar);
        cartList.appendChild(listItem);

        total += item.precio;
    });

    cartTotal.textContent = `${formatoMoneda(total)}`;
}

function formatoMoneda(valor) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(valor);
}

function crearCartas() {
    const productCards = document.querySelector('.product-cards');

    productos.forEach(producto => {
        const card = crearCarta(producto);
        productCards.appendChild(card);
    });
}

function crearCarta(producto) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    const img = document.createElement('img');
    img.src = producto.imagen;
    img.alt = producto.nombre;

    const nombre = document.createElement('h3');
    nombre.textContent = producto.nombre;

    const precio = document.createElement('p');
    precio.textContent = `Precio: ${formatoMoneda(parseFloat(producto.precio))} COP`;

    const btnAgregar = document.createElement('button');
    btnAgregar.textContent = 'Agregar al carrito';
    btnAgregar.addEventListener('click', () => {
        agregarAlCarrito(producto);
    });

    card.appendChild(img);
    card.appendChild(nombre);
    card.appendChild(precio);
    card.appendChild(btnAgregar);

    return card;
}

document.addEventListener('DOMContentLoaded', () => {
    crearCartas();
    actualizarCarrito();
});