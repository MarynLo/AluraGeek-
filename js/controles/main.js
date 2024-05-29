// main.js
import { servicesProducts } from "../services/product-services.js";

// contenedor para los productos
const productContainer = document.querySelector("[data-producto]");

// formulario para agregar productos
const form = document.querySelector("[data-form]")

// crea la estructura del HTML de las card de los productos
function crearCard(name, price, imagen, id) {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <div>
    <img class="img" src="${imagen}" alt="${name}"/>
    </div>

        <div class="card-container--info">
          <p>${name}</p>
        <div class="card-container--value">
          <p>${price}</p>
        <button class="delete_button" data-id="${id}">
        <img src="imagenes/icono-basura.png" alt="icono de basura" />
      </button>
    </div>
  </div>
    `;

  productContainer.appendChild(card);
  return card;
}

// evento de envio de formulario
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.querySelector("[data-name]").value;
  const price = document.querySelector("[data-price]").value;
  const imagen = document.querySelector("[data-image]").value;


// Verificar si algún campo está vacío y mostrar alerta correspondiente
if (name === "") {
  // alert("Por favor, ingresa un nombre para el producto.");
  swal("Ingresa el nombre del producto.");
  return; // Detener el envío del formulario si falta el nombre
}

if (price === "") {
  swal("Ingresa el precio del producto.");
  return; // Detener el envío del formulario si falta el precio
}

if (imagen === "") {
  swal("Ingresa el URL del producto.");
  return; // Detener el envío del formulario si falta la imagen
}

  servicesProducts.createProducts(name, price, imagen)
  .then(() => {
    // Limpia los campos del formulario después de agregar el producto
    document.querySelector("[data-name]").value = "";
    document.querySelector("[data-price]").value = "";
    document.querySelector("[data-image]").value = "";
 // Renderizar nuevamente la lista de productos
 render();
})
.catch((err) => console.log(err));
});

  // renderiza los productos en la pagina
const render = async () => {
  try {
    const listProducts = await servicesProducts.productList();
    // limpia el contenedor de productos
    productContainer.innerHTML = "";

    listProducts.forEach((product) => {
      productContainer.appendChild(
        crearCard(product.name, product.price, product.imagen, product.id)
      );
    });
  } catch (error) {
    console.log(error);
  }
};

// //  eliminar producto
productContainer.addEventListener("click", async (event) => {
  const botonEliminar = event.target.closest(".delete_button");
  if (botonEliminar) {
    const itemId = botonEliminar.dataset.id;
    servicesProducts
      .deleteProducto(itemId)
      .then(() => {
        console.log("Producto eliminado exitosamente");
        // Eliminar el elemento de la tarjeta del DOM
        botonEliminar.closest(".card").remove();
      })
      .catch((err) => console.log(err));
  }
});

// inicia la renderizacion de productos al cargar la pag
render();



