import express from "express";
import { ProductManager } from "../ProductManager.js";
import handlebars from "express-handlebars";
import { routerProducts } from "./routes/product.router.js";
import { __dirname } from "./routes/utils.js";
import { uploader } from "./routes/utils.js";
import { cartsRouter } from "./routes/carts.router.js";
import { CartstManager } from "../CartsManager.js";
import { Server } from "socket.io";
import {viewsRouter} from "./routes/products.view.router.js"



const app = express();
const port = 3000;
const productManager = new ProductManager();
const cartsManager = new CartstManager();

// Nueva entrega---------------
const httpServer = app.listen(port, () => {
  console.log(`Server running on port http:/localhost:${port}`);
});

const socketServer = new Server (httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MOTOR HANDLEBARS-------------
app.engine("handlebars", handlebars());
app.set("views", __dirname + "/views");

/*
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views"); */
app.set("view engine", "handlebars");



//console.log(__dirname + "/public");
app.use(express.static(__dirname + "public"));
socketServer.on("formSubmission", async (data) =>{
  await productManager.addProduct(data);
  const products = await productManager.getProducts();
  socketServer.sockets.emit("prodcuts", products);
})
app.use("/", viewsRouter);

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