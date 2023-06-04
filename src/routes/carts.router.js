import { Router } from "express";
import express from "express";
import { CartsManager } from "../../CartsManager.js";

const cartsManager = new CartsManager();

export const cartsRouter = Router();

cartsRouter.use(express.json());
cartsRouter.use(express.urlencoded({ extended: true }));

cartsRouter.post("/", async (req, res) => {
    const userCart = await cartsManager.createCart();

    res.status(201).json({ status: "success", data: userCart });
});

cartsRouter.get("/:cid", async (req, res) => {
    try {
        const cartId = await cartsManager.getCartById(Number(req.params.cid));
        res.status(200).json({ status: "success", data: cartId });
    } catch (error) {
        res.status(404).json({ status: "error", error: error.message });
    }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cartId = await cartsManager.addProductToCart(
            Number(req.params.cid),
            Number(req.params.pid)
        );
        res.status(200).json({ status: "success", data: cartId });
    } catch (error) {
        res.status(404).json({ status: "error", error: error.message });
    }
});