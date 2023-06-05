import express from "express";
import { ProductManager } from "../../ProductManager.js";
import { Router } from "express";

const productManager = new ProductManager();
export const routerProductsView = Router();

routerProductsView.use(express.json());
routerProductsView.use(express.urlencoded({ extended: true}));

routerProductsView.get("/", async (rq, res) => {
    const allProducts = await productManager.getProducts();
    res.render("home" , { allProducts});
})

routerProductsView.get("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts",{});
})