import express from "express";
import { ProductManager } from "./ProductManager.js";


//app.use(express.json());
const app = express();
const port = 8080;
const productManager = new ProductManager();




app.use(express.urlencoded({ extended: true }));



// RUTA DE ENTRADA URL ----------------------------------------------------------------
app.get("/", (req, res) => {
  return res.send("welcome to my app");
});

//pruebas del ProductManager en la app-------------------------------

app.get("/products", (req, res) => {
  console.log(req.query);
  const allProducts = productManager.getProducts();
  let limit = req.query.limit;
  if (!limit){
    return res.json({
      products: allProducts
    });
    
  }

  /*TEST PARA ELIMINAR CODIGO Y LIMPIAR ( EN COMENTADO ) POR EL SIGUIENTE ELSE IF

  const parsedLimit = parseInt(limit);
  if (parsedLimit > 0 && parsedLimit <= allProducts.length)
  const productsLimit = allProducts.slice(0, parsedLimit);{
  return res.json({ data: productsLimit });
}  return res.json({
    status: "error",
    msg: "Exceed the limit of products",
  });
});
  */

  else if (limit > 0 && limit <= allProducts.length){
    let productsLimit = allProducts.slice (0 , limit);
    return res.json ({data: productsLimit});
  }
  else if (limit > allProducts.length){
    return res.json({
      status: "error",
      msg: "Exceed the limit of products",
    });
  }
});

// AQUI ES DONDE SE TIENE QUE PONER EL LIMITE Y FILTRARLO
/*
const price = req.query.price;
  if (req.query && price) {
    const productsFilterByPrice = productManager.getProducts().filter(p => p.price == req.query.price);
    return res.json({
      status: "success",
      masg: "this are all of the products whit the price = " + price,
      data: productsFilterByPrice,

    })
    //AQUI SE ENVIAN TODOS LOS PRODUCTOS EN CASO QUE NO ENCUENTRE QUE SE ESTA BUSCANDO----------------
  } else {
    return res.json({
      status: "success",
      msg: "this are all of the products we have",
      data: productManager.getProducts(),
    })
  } 


*/

// LA BUSQUEDA POR ID " por PARAMS / " FUNCIONA --------------------------------------------------------------------------

app.get("/products/:id", (req, res) => {

  // se buscan los productos por id

  const id = parseInt(req.params.id);
  //test de la variable const product por productById = product.getProductById(id)
  const product = productManager.getProductById(id);
  //test if (product) por if (productById)
  if (product) {
    return res.json({
      status: "success",
      msg: "product found",
      //tenemos que cambiar el data: porduct por data: productById (ProductManager)
      data: product,
    });
  }
  else {
    return res.json({
      status: "error",
      msg: "product not found",
      data: {},
    });


  }


}); 




// TEST DE RUTA este esta funcionando bien pero no la necesitamos ahora----------------------------------
/*
app.get("/boca", (req, res) => {
  return res.json("el mejor del mundo");
});
*/

// ESTA ES LA RUTA DE URLS QUE NO EXISTEN ---------------------------------------------------
app.get("*", (req, res) => {
  return res.json({ status: "error", msg: "this route doesnt exist", data: {} });
});

//PUERTO DONDE ESTA CORRIENDO LA APP-------------------------------------------------------

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});



