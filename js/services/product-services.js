const productList =  () => {
    return fetch("http://localhost:3000/productos")
    .then((res) => {
        if (!res.ok) {
            throw new Error("Error al obtener la lista de productos");
        }
        return res.json();
    })

    .catch((err) => console.error(err));
};

// crea productos nuevos
const createProducts = (name, price, imagen) => {
    return fetch("http://localhost:3000/productos", {
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
         
         .then((res) =>{
            if (!res.ok) {
                throw new Error("Error al crear un nuevo producto");
            }
            return res.json();
         })
         .catch((err) => console.error(err));
};

export const servicesProducts = {
    productList, 
    createProducts
}



