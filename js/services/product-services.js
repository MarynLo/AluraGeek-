// product-services.js
const productList =  () => {
    return fetch("https://fake-api-zeta.vercel.app/productos")
    .then((res) => res.json ())
    .catch((err) => console.error(err));
    
};

// crea productos nuevos
const createProducts = (name, price, imagen) => {
    console.log("Enviando solicitud para crear producto...");
    console.log("Datos del nuevo producto:", name, price, imagen);

    return fetch("https://fake-api-zeta.vercel.app/productos", {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
             },
             body: JSON.stringify({
                 name,
                 price,
                 imagen,

             }),
         })
         
         .then((res) => res.json())
         .then((data) => {
            console.log("Respuesta del servidor:", data);
            return data; // Devolver los datos del nuevo producto creado
         })
         .catch((err) => console.error(err));
};

const deleteProducto = (id) => {
    return fetch(`https://fake-api-zeta.vercel.app/productos/${id}` , {
        method:"DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
    
};

export const servicesProducts = {
    productList, 
    createProducts,
    deleteProducto
}



