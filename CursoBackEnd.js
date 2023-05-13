import fs from "fs/promises";
//const fs = require ("fs");
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

  addProduct(title, description, price, thumbnail, code, stock) {
    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      !stock ||
      this.#getProductByCode(code)
    ) {
      throw new Error("Error: All fields are required, or the product already exists in the system.");
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
    fs.writeFile(this.#path, JSON.stringify(this.#products));
    console.log("Product added successfully.");
    return true;
  }

  deleteProduct(id) {
    const productIndex = this.#products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      console.log("Product not found.");
      return false;
    }
    this.#products.splice(productIndex, 1);
    fs.writeFile(this.#path, JSON.stringify(this.#products));
    console.log("Product deleted successfully.");
    return true;
  }

  updateProduct(id, key, value) {
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
    fs.writeFile(this.#path, JSON.stringify(this.#products));
    console.log("Product updated successfully.");
    return true;
  }
}








const testProduct = new ProductManager("./product.json");

testProduct.addProduct(

  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

testProduct.addProduct(

  "producto prueba_2",
  "Este es un producto prueba_2",
  200222,
  "Sin imagen_2",
  "abc123_2",
  25_2
);

testProduct.getProducts();

console.log(testProduct.products);
testProduct.updateProduct(1, 'title', 'metal');
testProduct.updateProduct(1, 'description', 'oro');

module.exports = ProductManager