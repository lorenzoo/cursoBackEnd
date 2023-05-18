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
  if (!limit) {
    return res.json({
      products: allProducts
    });

  }



  else if (limit > 0 && limit <= allProducts.length) {
    let productsLimit = allProducts.slice(0, limit);
    return res.json({ data: productsLimit });
  }
  else if (limit > allProducts.length) {
    return res.json({
      status: "error",
      msg: "Exceed the limit of products",
    });
  }
});



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






// ESTA ES LA RUTA DE URLS QUE NO EXISTEN ---------------------------------------------------
app.get("*", (req, res) => {
  return res.json({ status: "error", msg: "this route doesnt exist", data: {} });
});

//PUERTO DONDE ESTA CORRIENDO LA APP-------------------------------------------------------

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});



