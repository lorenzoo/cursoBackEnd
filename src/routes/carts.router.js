import { Router } from "express";
import express from "express";
import { CartstManager } from "../../CartsManager.js";

const cartsManager = new CartstManager();

export const cartsRouter = Router();

cartsRouter.use(express.json());
cartsRouter.use(express.urlencoded({ extended: true }));

cartsRouter.post("/", async (req, res) => {
    const userCart = await cartsManager.createCart();

    res.status(201).send({ status: "success", data: userCart });
});

cartsRouter.get("/:cid", async (req, res) => {
    try {
        const cartId = await cartsManager.getCartById(Number(req.params.cid));
        res.status(200).send({ status: "success", data: cartId });
    } catch (error) {
        res.status(404).send({ status: "error", error: error.message });
    }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cartId = await cartsManager.addProductToCart(
            Number(req.params.cid),
            Number(req.params.pid)
        );
        res.status(200).send({ status: "success", data: cartId });
    } catch (error) {
        res.status(404).send({ status: "error", error: error.message });
    }
});