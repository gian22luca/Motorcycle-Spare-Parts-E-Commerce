let productos = [
  {
    id: 1,
    nombre: 'Manubrio Flat Track 7/8"',
    precio: 11750,
    imagen: "images/imagen_manubrio.jpg",
    cantidad: 1,
    categoria: "manubrio",
    href: "detalle.html",
  },
  {
    id: 2,
    nombre: "Cinta Térmica",
    precio: 12200,
    imagen: "images/cinta_termica.jpg",
    cantidad: 1,
    categoria: "accesorio",
    href: "producto_2.html",
  },
  {
    id: 3,
    nombre: "Luz Delantera Chica",
    precio: 6800,
    imagen: "images/luz_delantera_chica.jpg",
    cantidad: 1,
    categoria: "luz",
    href: "producto_3.html",
  },
  {
    id: 4,
    nombre: "Puños Golf Largos",
    precio: 1900,
    imagen: "images/punios_golf_largos.jpg",
    cantidad: 1,
    categoria: "accesorio",
    href: "producto_4.html",
  },
  {
    id: 5,
    nombre: "Cubre Motor Royal Enfield 650",
    precio: 27990,
    imagen: "images/imagen_cubremotor.png",
    cantidad: 1,
    categoria: "accesorio",
    href: "producto_5.html",
  },
  {
    id: 6,
    nombre: "Guiños Led Boton",
    precio: 16700,
    imagen: "images/guiños_led.jpg",
    cantidad: 1,
    categoria: "luz",
    href: "producto_6.html",
  },
];

const contenedorProductos = document.getElementById("contenedor-productos");
const contenedorCarrito = document.getElementById("carrito-contenedor");
const botonVaciar = document.getElementById("vaciar-carrito");
const contadorCarrito = document.getElementById("contadorCarrito");
const precioTotal = document.getElementById("precioTotal");
const cantidad = document.getElementById("cantidad");
const cantidadTotal = document.getElementById("cantidadTotal");

let carrito = [];
let todos = document.getElementById('quitarFiltros')

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
  }
});

botonVaciar.addEventListener("click", () => {
  carrito.length = 0;
  actualizarCarrito();

  localStorage.setItem("carrito", JSON.stringify(carrito));
});

productos.forEach((producto) => {
  const div = document.createElement("div");
  div.classList.add("item");
  div.innerHTML = `
    <article>
    <a href=${producto.href}>
    <img src=${producto.imagen} alt="imagen del producto ${producto.id}"/>
    <h6>${producto.nombre}</h6>
    <p class="precioProducto">Precio: $${producto.precio}</p>
    </a>
    <button id=${producto.id} class="btn btn-dark">Agregar <i class="fas fa-shopping-cart"></i></button>
    </article>`;

  contenedorProductos.appendChild(div);

  const botonAgregar = document.getElementById(producto.id);

  botonAgregar.addEventListener("click", () => {
    agregarAlCarrito(producto.id);
  });

  //Filtrar productos

  todos.addEventListener("click", (e) => {
    div.style.display='flex';
  });

  luz.addEventListener("click", (e) => {
    if (producto.categoria == "luz") {
      div.style.display='flex';
      console.log(producto.categoria)
    }else{
      div.style.display='none';
    }
  });

  manubrio.addEventListener("click", (e) => {
    if (producto.categoria == "manubrio") {
      div.style.display='flex';
      console.log(producto.categoria)
    }else{
      div.style.display='none';
    }
  });

  accesorios.addEventListener("click", (e) => {
    if (producto.categoria == "accesorio") {
      div.style.display='flex';
      console.log(producto.categoria)
    }else{
      div.style.display='none';
    }
  });

  precio1.addEventListener("click", (e) => {
    if (producto.precio > 0 && producto.precio < 2000) {
      div.style.display='flex';
      console.log(producto.precio)
    }else{
      div.style.display='none';
    }
  });
  precio2.addEventListener("click", (e) => {
    if (producto.precio > 2000 && producto.precio < 10000) {
      div.style.display='flex';
      console.log(producto.precio)
    }else{
      div.style.display='none';
    }
  });

  precio3.addEventListener("click", (e) => {
    if (producto.precio > 10000) {
      div.style.display='flex';
      console.log(producto.precio)
    }else{
      div.style.display='none';
    }
  });
  precio0.addEventListener("click", (e) => {
    div.style.display='flex';
  });

});

const agregarAlCarrito = (prodId) => {
  const existe = carrito.some((prod) => prod.id === prodId);

  if (existe) {
    const prod = carrito.map((prod) => {
      if (prod.id === prodId) {
        prod.cantidad++;
      }
    });
  } else {
    const item = productos.find((prod) => prod.id === prodId);
    carrito.push(item);
  }
  actualizarCarrito();
};

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);
  const indice = carrito.indexOf(item);
  carrito.splice(indice, 1);
  actualizarCarrito();

  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  console.log(carrito);

  carrito.forEach((producto) => {
    const div = document.createElement("div");
    div.className = "productoEnCarrito";
    div.classList.add("productoEnCarrito");
    div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p><br>
            <p>Cantidad: <span id="cantidad">${producto.cantidad}</span></p><br>
            <button onClick="eliminarDelCarrito(${producto.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `;

    contenedorCarrito.appendChild(div);
    localStorage.setItem("carrito", JSON.stringify(carrito));
  });


  contadorCarrito.innerText = carrito.length;

  precioTotal.innerText = carrito.reduce(
    (acumulador, producto) => acumulador + producto.cantidad * producto.precio,
    0
  );
};

