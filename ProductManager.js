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

PRODUCT JSON PRODUCT -----------------
[{"title":"product 1","description":"Este es product 1","price":2400,"thumbnail":"No image","stock":25,"code":"1","id":1},{"title":"product 4","description":"Este es product 4","price":2300,"thumbnail":"No image","stock":22,"code":"4","id":4},{"title":"product 5","description":"Este es product 5","price":2200,"thumbnail":"No image","stock":30,"code":"5","id":5},{"title":"product 6","description":"Este es product 6","price":2300,"thumbnail":"No image","stock":22,"code":"6","id":6},{"title":"product 7","description":"Este es product 7","price":2200,"thumbnail":"No image","stock":30,"code":"7","id":7},{"title":"Product 8","description":"Descripción del producto 8","price":10.99,"thumbnail":"imagen.jpg","code":"ABC123","stock":23,"id":6}]


  */

  #getProductByCode(code) {
    return this.#products.find((product) => product.code === code);
  }

  #generateId() {
    return this.#id++ ;
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
      id: ++this.#id
    };

    this.#products.push(newProduct);
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
      console.log("It is not possible to modify the id field, try another field.");
      return false;
    }

    const product = this.#products.find((product) => product.id === id);
    if (!product) {
      console.log("Product not found.");
      return false;
    }

    product[key] = value;
    try {
    await fs.promises.writeFile(this.#path, JSON.stringify(this.#products));
    console.log("Product updated successfully.");
    return true;
  }  catch (error) {
    console.error("Error writing file:", error);
    return false;
  };

}};
