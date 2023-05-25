
import express from "express";
import { ProductManager } from "./ProductManager.js";

const app = express();
const port = 3000;
const productManager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.send("welcome to my app");
});

app.get("/products", (req, res) => {
  console.log(req.query);
  const allProducts = productManager.getProducts();
  let limit = req.query.limit;
  if (!limit) {
    return res.status(200).json({
      products: allProducts
    });
  } else if (limit > 0 && limit <= allProducts.length) {
    let productsLimit = allProducts.slice(0, limit);
    return res.json({ data: productsLimit });
  } else if (limit > allProducts.length) {
    return res.status(400).json({
      status: "error",
      msg: "Exceed the limit of products",
    });
  }
});
//ENCONTRAR PRODUCTO POR ID
app.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  productManager.getProductById(id).then(product => {
    return res.status(200).json({
      status: "success",
      msg: "product found",
      data: product,
    });
  })
    .catch(error => {
      return res.status(400).json({
        status: "error",
        msg: "product not found",
        data: {},
      });
    });
});
//BORRAR PRODUCTO
app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  productManager.getProductById(id).then(product => {
    productManager.deleteProduct(id);
    return res.status(200).json({
      status: "success",
      msg: `Product with id = ${id} has been deleted`,
      data: {},
    });
  })
    .catch(error => {
      return res.status(400).json({
        status: "error",
        msg: "Product not found",
        data: {},
      });
    });
});


//MODIFICAR PRODUCTO
app.put("/products/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const newData = req.body;
  const productkey = Object.keys(newData);
  const productvalue = Object.values(newData);


  const updatedProduct = await productManager.updateProduct(id, productkey[0], productvalue[0]);
  //console.log(updatedProduct);
  return res.status(201).json({
    status: "success",
    msg: "Product modified",
    data: updatedProduct,
  });

});

//CREAR PRODUCTO
app.post("/products", async (req, res) => {
  const createProduct = req.body;
  //createProduct.id = parseInt((Math.random() * 1000).toFixed(0));

  try {
    const result = await productManager.addProduct(createProduct.title, createProduct.description, createProduct.price, createProduct.thumbnail, createProduct.code, createProduct.stock);
    if (result) {
      return res.status(201).json({
        status: "success",
        msg: "Product created",
        data: createProduct,
      });
    } else {
      return res.status(400).json({
        status: "error",
        msg: "Error creating product",
        data: {},
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      msg: "Error creating product",
      data: {},
    });
  }
});


app.get("*", (req, res) => {
  return res.status(404).json({ status: "error", msg: "This route doesn't exist", data: {} });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});