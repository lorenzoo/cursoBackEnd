import fs from "fs";


export class ProductManager {
  #path;
  #products;
  #id;
  constructor() {
    this.#id = 0,
    this.#path = "./product.json";
    this.#products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
    
  }



  getProducts() {
    console.log(this.#products);
    return this.#products;
  }


  getProductById(id) {
    return new Promise((resolve, reject) => {
      const product = this.#products.find((product) => product.id === id);
      if (product) {
        resolve(product);
      } else {
        reject(new Error("Product not found"));
      }
    });
  }

/* TEST PRODUCT EN PROMESA--------

  getProductById(id) {
    const productFound = this.#products.find((product) => product.id === id);
    if (productFound) {
      return productFound;
    } else {
      console.log("Product not found");
      return undefined;
    }
  }
*/

  #getProductByCode(code) {
    return this.#products.find((product) => product.code === code);
  }

  #generateId() {
    
    return this.#products.length+1;
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
      id: this.#generateId()
    };

    this.#products.push(newProduct);
    this.id++;
    try {
      //test fs.promises.writeFile
      await fs.promises.writeFile(this.#path, JSON.stringify(this.#products));
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
    //test fs.promises.writeFile
    try {
      await fs.promises.writeFile(this.#path, JSON.stringify(this.#products));
      console.log("Product deleted successfully.");
      return true;
    } catch (error) {
      console.error("Error writing file:", error);
      return false;
    }
  }

  async updateProduct(id, key, value) {
    if (key === "id") {
      console.log("It is not possible to modify this field, try another field.");
      return false;
    }

    const product = this.#products.find((product) => product.id === id);
    if (!product) {
      console.log("Product not found.");
      return false;
    }

    product[key] = value;
    console.log(product[key]);
    try {
    await fs.promises.writeFile(this.#path, JSON.stringify(this.#products));
    console.log("Product updated successfully.");
    return product;
  }  catch (error) {
    console.error("Error writing file:", error);
    return false;
  };

}};
