const productList =  () => {
    return fetch("http://localhost:3000/productos")
    .then((res) =>res.json())
    .catch((err) => console.log(err));
};

// crea productos nuevos
async function createProducts  (name, price, imagen) {
 const conexion = await fetch("http://localhost:3000/productos", {
             method: "POST",
             headers: {
                 "Content-Type": "application/json",
             },
             body: JSON.stringify({
                 name,
                 price,
                 imagen,

             })
         });
        
         const productList= await conexion.json();
         return productList; 
};

async function borrarProducto(id) {
    try {
        const response = await fetch(`${createProducts}/${id}`,{
            method:"DELETE",
            headers: { 
                "Content-type": "application/json",
             }
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el producto');
        }

        return response;
    } catch (error) {
        console.error(`Error al eliminar el producto: ${error}`);
    }
}


export const servicesProducts = {
    productList, 
    createProducts,
    borrarProducto
};



