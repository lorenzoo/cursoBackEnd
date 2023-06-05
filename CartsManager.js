import { ProductManager } from "./ProductManager.js";
import fs from "fs";

const productManager = new ProductManager();

export class CartsManager {
  #path;
  #carts;
  #idCounter;

  constructor() {
    if (!fs.existsSync("./carts.json")) {
      fs.writeFileSync("./carts.json", "[]", "utf-8");
    }
    this.#path = "carts.json";
    this.#carts = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    this.#idCounter = this.#carts.length > 0 ? this.#carts[this.#carts.length - 1].id + 1 : 0;
  }

  #generateId() {
    const newID = this.#idCounter;
    this.#idCounter += 1;
    return newID;
  }

  otherID() {
    const newID = this.#generateId();
    console.log(newID);
  }

  createCart() {
    return new Promise((resolve, reject) => {
      const newCart = {
        id: this.#generateId(),
        products: [],
      };

      // Validar si el carrito ya existe en la lista #carts
      const existingCart = this.#carts.find((cart) => cart.id === newCart.id);
      if (existingCart) {
        reject(new Error("Cart already exists with ID: " + newCart.id));
        return;
      }

      this.#carts.push(newCart);

      fs.writeFile(this.#path, JSON.stringify(this.#carts), "utf-8", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(newCart);
        }
      });
    });
  }

  getCartById(id) {
    return new Promise((resolve, reject) => {
      const foundCart = this.#carts.find((cart) => cart.id === id);
      if (!foundCart) {
        reject(new Error("Cart not found with ID: " + id));
      } else {
        resolve(foundCart);
      }
    });
  }

  addProductToCart(cartId, productId) {
    return new Promise((resolve, reject) => {
      const cart = this.#carts.find((cart) => cart.id === cartId);
      if (!cart) {
        reject(new Error("Cart not found with ID: " + cartId));
        return;
      }

      const product = productManager.getProductById(productId);
      if (!product) {
        reject(new Error("Product not found with ID: " + productId));
        return;
      }

      cart.products.push(product);
      fs.writeFile(this.#path, JSON.stringify(this.#carts), "utf-8", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(cart);
        }
      });
    });
  }

  removeProductFromCart(cartId, productId) {
    return new Promise((resolve, reject) => {
      const cart = this.#carts.find((cart) => cart.id === cartId);
      if (!cart) {
        reject(new Error("Cart not found with ID: " + cartId));
        return;
      }

      const productIndex = cart.products.findIndex((product) => product.id === productId);
      if (productIndex === -1) {
        reject(new Error("Product not found in the cart with ID: " + productId));
        return;
      }

      cart.products.splice(productIndex, 1);
      fs.writeFile(this.#path, JSON.stringify(this.#carts), "utf-8", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(cart);
        }
      });
    });
  }
}
