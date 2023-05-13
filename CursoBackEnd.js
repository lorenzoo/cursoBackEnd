import fs from "fs/promises";
//const fs = require("fs/promises");
//const fs = require ("fs");
//import { promises as fs } from "fs";

class ProductManager {
  #path;
  #products;
  constructor(path) {
    this.#path = path;
    this.#products = [];
    this.#initialize();
  }

  async #initialize() {
    try {
      const fileContent = await fs.readFile(this.#path, "utf-8");
      this.#products = JSON.parse(fileContent);
    } catch (error) {
      await fs.writeFile(this.#path, "[]");
    }
  }

  getProducts() {
    console.log(this.#products);
    return this.#products;
  }

  getProductById(id) {
    const productFound = this.#products.find((product) => product.id === id);
    if (productFound) {
      return productFound;
    } else {
      console.log("Product not found");
      return undefined;
    }
  }

  #getProductByCode(code) {
    return this.#products.find((product) => product.code === code);
  }

  #generateId() {
    return this.#products.length + 1;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Error: All fields are required.");
    }
    if (this.#getProductByCode(code)) {
      throw new Error("Error: Product with the same code already exists.");
    }


    const newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: this.#generateId(),
    };

    this.#products.push(newProduct);
    try {
      await fs.writeFile(this.#path, JSON.stringify(this.#products));
      console.log("Product added successfully.");
      return true;
    } catch (error) {
      console.error("Error writing file:", error);
      return false;
    }
  }
  async deleteProduct(id) {
    const productIndex = this.#products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      console.log("Product not found.");
      return false;
    }
    this.#products.splice(productIndex, 1);
    await fs.writeFile(this.#path, JSON.stringify(this.#products));
    console.log("Product deleted successfully.");
    return true;
  }

  async updateProduct(id, key, value) {
    if (key === "id") {
      console.log("It is not possible to modify the id field, try another field.");
      return false;
    }

    const product = this.#products.find((product) => product.id === id);
    if (!product) {
      console.log("Product not found.");
      return false;
    }

    product[key] = value;
    await fs.writeFile(this.#path, JSON.stringify(this.#products));
    console.log("Product updated successfully.");
    return true;
  }

}

const productManager = new ProductManager("./products.json");

productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
productManager.addProduct("producto prueba_2", "Este es un producto prueba_2", 200222, "Sin imagen_2", "abc123_2", 252);

productManager.getProducts();

console.log(productManager.products);
productManager.updateProduct(1, 'title', 'metal');
productManager.updateProduct(1, 'description', 'oro');

export { ProductManager };
