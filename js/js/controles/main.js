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
    <img class="img" src="${imagen}" alt=""/>
    </div>
|
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
async function listProducts () {
  try {
    const listProducts = await servicesProducts.productList();

    listProducts.forEach(product => {
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

listProducts();

// evento de envio de formulario

async function createProducts(event){
  event.preventDefault();

  const name = document.querySelector("[data-name]").value;
  const price = document.querySelector("[data-price]").value;
  const image = document.querySelector("[data-image]").value;
  try {
    await productList.createProducts(name, price, image);
    window.location.reload()
  } catch (error) {
    console.log(error);
  }
}

formu.addEventListener("submit", event => {
  createProducts(event)
});
 
// formulario 
function limpiarFormulario() {
  document.querySelector('[data-name]').value = "";
  document.querySelector('[data-price]').value = "";
  document.querySelector('[data-image]').value = "";
  document.getElementById('nameError').textContent = "";
  document.getElementById('priceError').textContent = "";
  document.getElementById('imageError').textContent = "";
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("formulario").addEventListener("submit", function(event){
  // obtener los valores de los input
  var name= document.querySelector("[data-name]").value;
  var price = document.querySelector("[data-price]").value;
  var imagen = document.querySelector("[data.-image]").value;

  document.getElementById("nameError").textContent ="";
  document.getElementById("priceError").textContent ="";
  document.getElementById("imagenError").textContent ="";
  var valid =true;
  // validacion del nombre 
  if (name.trim() ==="") {
    document.getElementById("nameError").textContent = "El nombre es obligatorio";
    valid = false;
  }
  if (price.trim() ==="") {
    document.getElementById("priceError").textContent = "El precio  es obligatorio";
    valid = false;
  } else if (isNaN(price) || Number(price) <= 0) {
    document.getElementById('priceError').textContent = 'El precio debe ser un número positivo.';
    valid = false;
  }
  if (imagen.trim() ==="") {
    document.getElementById("imagenError").textContent = "Imagen es obligatorio";
    valid = false;
  }else if (isNaN(imagen) || Number(price) <= 0) {
    document.getElementById('imagenError').textContent = 'URL valida.';
    valid = false;
  }
  if (!valid) {
    event.preventDefault();
  }
  });

  document.querySelector("limpiar").addEventListener ("click", function(event){
    event.preventDefault();
    limpiarFormulario();
  })
})

// boton eliminar producto
async function eliminarProducto(id){
  await productList.borrarProducto(id);
  window.location.href="http://localhost:3000/productos";
}
window.addEventListener("load", function() {
  const botonBorrar = document.querySelectorAll(".delete_button");

  botonBorrar.fetch(botones => {
      const id = botones.getAttribute("data-id");
      console.log("ID del boton:" + id);

      botones.addEventListener("click", (event) =>{
          event.preventDefault();
          eliminarProducto(id);
      });
  });
});

// inicia la renderizacion de productos al cargar la pag
render();
