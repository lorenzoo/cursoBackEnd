import express from "express";
import { ProductManager } from "../ProductManager.js";

import { routerProducts } from "./routes/product.router.js";
import { __dirname } from "./routes/utils.js";
import { uploader } from "./routes/utils.js";
import { cartsRouter } from "./routes/carts.router.js";
import { CartstManager } from "../CartsManager.js";


const app = express();
const port = 8080;
const productManager = new ProductManager();
const CartsManager = new CartstManager();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//console.log(__dirname + "/public");
app.use(express.static(__dirname + "/public"));

//ALL END POINTS PRODUCTS-------------------
app.use("/api/products", routerProducts);

app.use("/api/carts",cartsRouter)

app.get("*", (req, res) => {
  return res.status(404).json({ status: "error", msg: "This route doesn't exist", data: {} });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});