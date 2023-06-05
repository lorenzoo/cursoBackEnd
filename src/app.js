import express from "express";
import { ProductManager } from "../ProductManager.js";
import exphbs from "express-handlebars";
import { routerProducts } from "./routes/product.router.js";
import { __dirname } from "./routes/utils.js";
import { uploader } from "./routes/utils.js";
import { cartsRouter } from "./routes/carts.router.js";
import { CartsManager } from "../CartsManager.js";
import { Server } from "socket.io";
import {routerProductsView} from "./routes/products.view.router.js"
import path from "path";



const app = express();
const port = 3000;
const productManager = new ProductManager();
const cartsManager = new CartsManager();

// Nueva entrega---------------
const httpServer = app.listen(port, () => {
  console.log(`Server running on port http:/localhost:${port}`);
});

const socketServer = new Server (httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// MOTOR HANDLEBARS-------------
const hbs = exphbs.create();
app.engine("handlebars", hbs.engine);
app.set("views", __dirname + "/views"),
app.set("view engine", "handlebars");




//console.log(__dirname + "/public");
app.use(express.static(path.join(__dirname + "public")));
socketServer.on("formSubmission", async (data) =>{
  await productManager.addProduct(data);
  const products = await productManager.getProducts();
  socketServer.sockets.emit("prodcuts", products);
})
app.use("/", routerProductsView);

//Nuevo trabajo---------
socketServer.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");
  const products = await productManager.getProducts();
  socket.emit("products", products);

  socket.on("formSubmission", async (data) => {
    await productManager.addProduct(data);
    const products = await productManager.getProducts();
    socketServer.sockets.emit("products", products);
  });
});


//ALL END POINTS PRODUCTS-------------------
app.use("/api/products", routerProducts);

app.use("/api/carts",cartsRouter)

app.use("*", (req, res) => {
  return res.status(404).json({ status: "error", msg: "This route doesn't exist", data: {} });
});
/*
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
}); 
*/