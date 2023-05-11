const fs = require("fs");


class ProductManager {
  #path
  constructor(path) {
    this.products = [];
    this.#path = path;
    if (!fs.existsSync(this.#path)){
      return fs.writeFileSync(this.#path, "[]")
    }
  }


  getProducts() {
    this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"))
    console.log(this.products);
    return this.products;
  }



  getProductById(id) {

    this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"))
    const productFound = this.products.find(pro => pro.id == id);
    if (productFound) {
      return productFound;
    } else {
      console.log("Not found");
      return undefined;
    }
  }
  #getProductByCode(code) {

    this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"))
    const isInsArray = this.products.find(pro => pro.code === code);
    if (isInsArray) {
      return isInsArray;
    } else {
      return false;
    }
  }


  #generateId() {


    return this.products.length + 1;
  }

  addProduct(
    title,
    description,
    price,
    thumbnail,
    code,
    stock
  ) {

    this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"))

    if (
      title == undefined ||
      title == null ||
      title == "" ||

      description == undefined ||
      description == null ||
      description == "" ||

      price == undefined ||
      price == null ||
      price == "" ||

      thumbnail == undefined ||
      thumbnail == null ||
      thumbnail == "" ||

      code == undefined ||
      code == null ||
      code == "" ||
      this.#getProductByCode(code) ||

      stock == undefined ||
      stock == null ||
      stock == ""
    ) {
      console.log("Error, all fields are required, make sure this product is not adde in the system already");
    } else {

      const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: this.#generateId(),


      };

      this.products = [...this.products, newProduct];
      fs.writeFileSync(this.#path, JSON.stringify(this.products))

      console.log("Product added");
      return true
    }

  }
  //tarea_2 test delete and update product
  deleteProduct(id) {
    this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"))
    const productFound = this.products.find(pro => pro.id == id);
    if (this.products.find(p => p.id === id)) {
      this.products.splice(this.products.indexOf(this.products.find(pro => pro.id === id)), 1)
      fs.writeFileSync(this.#path, JSON.stringify(this.products))
      return console.log("Deleted product successfully")

    } else {
      return console.log("Product not found")
    }
  }

  updateProduct(id, key, value) {
    this.products = JSON.parse(fs.readFileSync(this.#path, "utf-8"))

    if (key == "id") {
      return console.log("It is not possible to modify the id field, try another field")
    } else if (this.products.find(pro => pro.id === id)) {
      const Found = this.products.find(pro => pro.id === id)
      Found[key] = value
      fs.writeFileSync(this.#path, JSON.stringify(this.products))
      return console.log("Updated product successfully", Found)
    } else {
      return console.log("Product not found")
    }
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

//chat error
/*try {
  var myObj = JSON.parse(myJSON);
}
catch (e) {
  console.log("Error al analizar JSON: " + e);
}
*/