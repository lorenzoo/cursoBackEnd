import express from "express";
import { ProductManager } from "./ProductManager.js";


//app.use(express.json());
const app = express();
const port = 3000;
const productManager = new ProductManager();


 
app.use(express.json());
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
    return res.status(200).json({
      products: allProducts
    });

  }



  else if (limit > 0 && limit <= allProducts.length) {
    let productsLimit = allProducts.slice(0, limit);
    return res.json({ data: productsLimit });
  }
  else if (limit > allProducts.length) {
    return res.status(400).json({
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
    return res.status(200).json({
      status: "success",
      msg: "product found",
      
      data: product,
    });
  }
  else {
    return res.status(400).json({
      status: "error",
      msg: "product not found",
      data: {},
    });


  }


});

// DELETE PRODUCT BY ID

app.delete("/products/:id", (req, res) => {

  // se elimina los productos por id

  const id = parseInt(req.params.id);
  
  const product = productManager.getProductById(id);

  // TEST NUEVO CODIGO BORRAR POR ID "FUNCIONA CORRECTAMENTE"------------------
  if (product) {
    productManager.deleteProduct(id);
    
    return res.status(200).json({
      status: "success",
      msg: "Product with id = " + id + " has been deleted",
      data: {},
    });
  }
  
  else {
    return res.status(400).json({
      status: "error",
      msg: "Product not found",
      data: {},
    });
  } 
});

//METODO PUT---------------------------------------
app.put("/products/:id", (req, res) => {

  // se elimina los productos por id

  const id = parseInt(req.params.id);
  const newData = req.body;
  const product = productManager.getProductById(id);

//test const index

  const index = product.findIndex(item => item.id === id);

  if (index == -1 ) {
    
    
    return res.status(400).json({
      status: "error",
      msg: "This product does not exist ",
      data: {},
    });
  }
  
  else {
   product [index] = {...newData, id: product[index].id} ;
   return res.status(201).json({
    status: "success",
    msg: "Product modified",
    data:product [index],
   })

}
});






 // METODO POST ---------------------------------
app.post("/products", (req, res) => {

  // SE CREA UN PRODUCTO

  const createProduct = req.body;
  const product = productManager.getProducts();

  createProduct.id = (Math.random() * 1000 ).toFixed(0);
  console.log(createProduct);
  res.send("hola");

  product.push(createProduct);
  // test de codigo productManager.addProduct(createProduct);
  return res.status(201).json({ 
    status: "success", 
    msg: "Product created",
    data: createProduct,
  });

  /*
 
    return res.status(200).json({
      status: "success",
      msg: "Product with id = " + id + " has been deleted",
      data: {},
    });
  }
  
  else {
    return res.status(400).json({
      status: "error",
      msg: "Product not found",
      data: {},
    });
  } */
});



// ESTA ES LA RUTA DE URLS QUE NO EXISTEN ---------------------------------------------------
app.get("*", (req, res) => {
  return res.status(404).json({ status: "error", msg: "this route doesnt exist", data: {} });
});

//PUERTO DONDE ESTA CORRIENDO LA APP-------------------------------------------------------

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
