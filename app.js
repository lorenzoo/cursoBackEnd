import express from "express";
import { ProductManager } from "./ProductManager.js";



const app = express();
const port = 8080;
const productManager = new ProductManager();
//const products = productManager;



app.use(express.urlencoded({ extended: true }));

//ADAPTARLO A NUESTRO PRODUCT MANAGER------------------------------------------
/*
let products = [

  { id: "1", name: "pelota", price: 20, },
  { id: "2", name: "cami", price: 30, },
  { id: "3", name: "pantalon", price: 80, }

];
*/ 

// RUTA DE ENTRADA URL ----------------------------------------------------------------
app.get("/", (req, res) => {
  return res.send("welcome to my app");
});
//pruebas del ProductManager en la app-------------------------------
//app.use("/products", productManager, ProductManager);
// adadptar ruta para la entrega de rutas
// BUSQUEDA PRECIO " por query ?precio= "FUNCIONA BIEN SINO ENCUENTRA NADA DEVUELVE TODOS LOS PRODUCTOS------------
app.get("/products", (req, res) => {
  console.log(req.query);
  
// AQUI ES DONDE SE TIENE QUE PONER EL LIMITE Y FILTRARLO
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
})



// LA BUSQUEDA POR ID " por PARAMS / " FUNCIONA --------------------------------------------------------------------------

app.get("/products/:id", (req, res) => {

  // se buscan los productos por id

  const id = req.params.id;
  //test de la variable const product por productById = product.getProductById(id)
  const product = products.find((p) => p.id == id);
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




// este esta funcionando bien pero no la necesitamos ahora----------------------------------
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
  console.log(`Example app listening on port ${port}`);
});



