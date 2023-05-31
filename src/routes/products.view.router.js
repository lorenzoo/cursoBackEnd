import express from "express";
import {products } from "./utils.js";


export const routerProductsView = express.Router();

routerProductsView.get("/", (rq, res) =>{
    return res.render("products.html", {
        title: "Title . Products",
        products: products,

    })
})