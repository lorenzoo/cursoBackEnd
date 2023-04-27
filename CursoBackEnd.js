class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    console.log(this.products);
    return this.products;
  }
  getProductById(id) {
    const productFound = this.products.find((pro) => pro.id == id);
    if (productFound) {
      return productFound;
    } else {
      console.log("Not found");
      return undefined;
    }
  }
  #getProductByCode(code) {
    const isInsArray = this.products.find((pro) => pro.code == code);
    if (isInsArray) {
      return true;
    } else {
      return false;
    }
  }

  #generateId() {
    let maxId = 0;
    for (let index = 0; index < this.products.length; index++) {
      const pro = this.products[index];
      if (pro.id > maxId) {
        maxId = pro.id;
      }
      return ++maxId;
    }
  }
  addProduct(title, description, price, thumbnail, code, stock) {
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
      (thumbnail == null) | (thumbnail == "") ||
      code == undefined ||
      (code == null) | (code == "") ||
      this.#getProductByCode(code) ||
      stock == undefined ||
      stock == null ||
      stock == ""
    ) {
      console.log("Error");
    } else {
      let newProduct = { ...this.addProduct, id: this.#generateId() };
      this.products = [...this.products, newProduct];
    }
  }
}
const testProduct = new ProductManager();

testProduct.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25,
);