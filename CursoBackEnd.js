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
      return isInsArray;
    } else {
      return false;
    }
  }
  
  /*  #generateId() {
      let Id = 0;
      for (let i = 0; i < this.products.length; i++) {
        const pro = this.products[i];
         if (pro.id > newId)
         {
          Id = pro.id;
        }
        return ++Id;
      }
    }
  */
  
  #generateId() {

    let newId = 1;
    newId = this.products.length;
    return ++newId;
  }

  addProduct(
    title,
    description,
    price,
    thumbnail,
    code,
    stock
    ) {
    //const id = this.#generateId();
    
    if (
      (title == undefined ||
        title == null ||
        title == "") ||

      (description == undefined ||
        description == null ||
        description == "") ||

      (price == undefined ||
        price == null ||
        price == "") ||

      (thumbnail == undefined ||
        thumbnail == null ||
        thumbnail == "") ||

      (code == undefined ||
        code == null ||
        code == "" ||
        this.#getProductByCode(code)) ||

      (stock == undefined ||
        stock == null ||
        stock == "")
    ) {
      console.log("Error");
    } else {
      //const id = this.#generateId()
      const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: this.#generateId(),
        
      };
      // hasta aqui todo bien
      this.products = [...this.products, newProduct];
      return true
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

console.log(testProduct.products);