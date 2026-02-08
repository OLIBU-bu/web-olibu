let carrito = [];

function agregarCarrito(nombre, precio) {
  const producto = carrito.find(item => item.nombre === nombre);

  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  actualizarCarrito();
}

function aumentarCantidad(nombre) {
  const producto = carrito.find(item => item.nombre === nombre);
  if (producto) {
    producto.cantidad++;
    actualizarCarrito();
  }
}

function disminuirCantidad(nombre) {
  const producto = carrito.find(item => item.nombre === nombre);
  if (producto) {
    producto.cantidad--;
    if (producto.cantidad <= 0) {
      carrito = carrito.filter(item => item.nombre !== nombre);
    }
    actualizarCarrito();
  }
}

function eliminarProducto(nombre) {
  carrito = carrito.filter(item => item.nombre !== nombre);
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalSpan = document.getElementById("total");

  lista.innerHTML = "";
  let total = 0;

  carrito.forEach(item => {
    total += item.precio * item.cantidad;

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.nombre}</strong><br>
      S/ ${item.precio} x ${item.cantidad} = S/ ${(item.precio * item.cantidad).toFixed(2)}
      <div class="cantidad-controles">
        <button onclick="disminuirCantidad('${item.nombre}')">−</button>
        <button onclick="aumentarCantidad('${item.nombre}')">+</button>
        <button class="eliminar" onclick="eliminarProducto('${item.nombre}')">✕</button>
      </div>
    `;
    lista.appendChild(li);
  });

  totalSpan.textContent = total.toFixed(2);
}

function comprarWhatsApp() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  let mensaje = "Hola, quiero hacer el siguiente pedido:%0A";

  carrito.forEach(item => {
    mensaje += `- ${item.nombre} x${item.cantidad} (S/ ${(item.precio * item.cantidad).toFixed(2)})%0A`;
  });

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  mensaje += `%0ATotal: S/ ${total.toFixed(2)}`;

  window.open(`https://wa.me/51975455690?text=${mensaje}`, "_blank");
}
