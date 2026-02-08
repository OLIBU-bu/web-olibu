// 🔹 AQUÍ VAN LOS PRODUCTOS (por ahora vacío)
const productos = [
  // Cuando tengas productos, aquí los agregas
];

// 🔹 Carrito
let carrito = [];

// 🔹 Obtener precio según cantidad (mayorista)
function obtenerPrecioUnitario(producto, cantidad) {
  let precio = producto.precios[0].precio;

  producto.precios.forEach(p => {
    if (cantidad >= p.min) {
      precio = p.precio;
    }
  });

  return precio;
}

// 🔹 Agregar producto
function agregarAlCarrito(id) {
  const item = carrito.find(p => p.id === id);

  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ id, cantidad: 1 });
  }

  renderCarrito();
}

// 🔹 Cambiar cantidad
function cambiarCantidad(id, cambio) {
  const item = carrito.find(p => p.id === id);
  if (!item) return;

  item.cantidad += cambio;

  if (item.cantidad <= 0) {
    carrito = carrito.filter(p => p.id !== id);
  }

  renderCarrito();
}

// 🔹 Eliminar producto
function eliminarProducto(id) {
  carrito = carrito.filter(p => p.id !== id);
  renderCarrito();
}

// 🔹 Mostrar productos
function renderProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  if (productos.length === 0) {
    contenedor.innerHTML = "<p>Aún no hay productos cargados.</p>";
    return;
  }

  productos.forEach(p => {
    contenedor.innerHTML += `
      <div class="producto">
        <h3>${p.nombre}</h3>
        <p>Precio desde S/ ${p.precios[p.precios.length - 1].precio}</p>
        <button onclick="agregarAlCarrito(${p.id})">Agregar</button>
      </div>
    `;
  });
}

// 🔹 Mostrar carrito
function renderCarrito() {
  const contenedor = document.getElementById("carrito");
  contenedor.innerHTML = "";
  let total = 0;

  carrito.forEach(item => {
    const producto = productos.find(p => p.id === item.id);
    const precioUnitario = obtenerPrecioUnitario(producto, item.cantidad);
    const subtotal = precioUnitario * item.cantidad;
    total += subtotal;

    contenedor.innerHTML += `
      <div class="item-carrito">
        <strong>${producto.nombre}</strong><br>
        Precio unitario: S/ ${precioUnitario}<br>

        <div class="cantidad">
          <button onclick="cambiarCantidad(${item.id}, -1)">−</button>
          ${item.cantidad}
          <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
        </div>

        Subtotal: S/ ${subtotal.toFixed(2)}<br>
        <button onclick="eliminarProducto(${item.id})">Eliminar</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = total.toFixed(2);
}

// 🔹 Iniciar
renderProductos();
