import { servicesProducts } from "../services/product-services.js";

document.addEventListener("DOMContentLoaded", function(){

  // contenedor para los productos
const productContainer = document.querySelector("[data-producto]");

// formulario para agregar productos
const validarFormu = document.querySelector("[data-form]");

// boton enviar y formulario
const nombreInput = document.querySelector("[data-name]");
const precioInput = document.querySelector("[data-price]");
const imagenInput = document.querySelector("[data-image]");
const enviarBtn = document.querySelector(".submit");



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
        <img src="imagenes/icono-basura.png" alt="Eliminar" />
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

    listProducts.forEach((product) => {
      productContainer.appendChild(
        crearCard(
          product.name,
          product.price,
          product.imagen,
          product.id)
      );
    });
  } catch (error) {
    console.log(error);
  }
};

// formulario 

function validarFormu() {
  if (nombreInput.value.trim() !== "" && precioInput.value.trim() !== "" && imagenInput.value.trim() !== "") {
    enviarBtn.disabled = false;
  } else {
    enviarBtn.disabled = true;
  }
}
// evento para validar el formulario en cada cambio de entrada
nombreInput.addEventListener("input", validarFormu);
precioInput.addEventListener("input", validarFormu);
imagenInput.addEventListener("input", validarFormu);


// Evento para eliminar productos
productContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete_button")) {
    const productId = event.target.dataset.id;
    const card = event.target.closest(".card");
    card.remove(); // Elimina la tarjeta de la interfaz de usuario

    return productId();

    // Aquí puedes agregar la lógica para eliminar el producto del backend
    // Puedes usar el productId para identificar el producto que se va a eliminar
  }
});
})


// evento de envio de formulario
// formu.addEventListener("submit", (event) => {
//   event.preventDefault();

//   const name = document.querySelector("[data-name]").value;
//   const price = document.querySelector("[data-price]").value;
//   const image = document.querySelector("[data-image]").value;

//   servicesProducts.createProducts(name,price,image)
//   .then((res)=> console.log(res))
//   .catch((err)=> console.log(err));
// });

  

// inicia la renderizacion de productos al cargar la pag
render();
