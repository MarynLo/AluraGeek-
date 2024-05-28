// main.js
import { servicesProducts } from "../services/product-services.js";

// contenedor para los productos
const productContainer = document.querySelector("[data-producto]");

// formulario para agregar productos
const formu = document.querySelector("[data-form]");

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

// renderiza los productos en la pagina
const render = async () => {
  try {
    const listProducts = await servicesProducts.productList();
    // limpia el contenedor de productos 
    productContainer.innerHTML = '';

    listProducts.forEach((product) => {
      productContainer.appendChild(
        crearCard(product.name, product.price, product.imagen, product.id)
      );
    });
  } catch (error) {
    console.log(error);
  }
};

// evento de envio de formulario
formu.addEventListener("submit", async (event) => {
  event.preventDefault();
  

  // obtener los datos del formulario
  const name = document.querySelector("[data-name]").value;
  const price = document.querySelector("[data-price]").value;
  const imagen = document.querySelector("[data-image]").value;

  console.log("Nombre:", name);
  console.log("Precio:", price);
  console.log("Imagen:", imagen);

  try {
    // enviar los datos al servidor para crear nuevo producto
    const nuevoProduct = await servicesProducts.createProducts(
      name,
      price,
      imagen
    );
    console.log("Respuesta del servidor:", nuevoProduct);

    // agregar nuevo producto
    productContainer.appendChild(
      crearCard(
        nuevoProduct.name,
        nuevoProduct.price,
        nuevoProduct.imagen,
        nuevoProduct.id
      )
    );
    
    // limpiar formulario despues de agregar
    formu.reset();
  } catch (error) {
    console.error(error);
  }
});

//  eliminar producto
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
