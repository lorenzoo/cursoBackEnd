

/*
class ProductManager {
    constructor () {
    this.products = [];

*/


   /* this.title = "";
    this.description ="";
    this.price= 0;
    this.thumbnail ="img";
    this.code = "id";
    this.stock = 0;
*/
  /*  }
    getProducts () {
console.log (this.products);
return this.products;
}
#generarId (){

    let idGenerado = 0;
    return idGenerado;
    
}



*/
    /* 

    addProduct = (product) => {
        const toArray = Object.values(product);
        const containNull = toArray.includes(null);
        const existsInArray = this.products.some(
            (p) => (p.code = product.code)
        );

        const productFinal = {
            id: this.getId(),
            ...product,
        };

        (!existsInArray && !containNull && this.products.push(productFinal)) ||
            console.log("Error product");
    };
}
*/



class TicketManager {
    constructor(){
this.eventos = [];
}

/* CREAMOS EL CONSTRUCTOR

class ProductManager {
    constructor () {
    this.products = [];

*/

getEventos(){
    console.log(this.eventos)
    return this.eventos;
}
/* GET PRODUCTS

getProducts(){
    console.log(this.products)
    return this.products;
}
*/
buscarEvento(id){
    const encontrado = this.eventos.find ((eve)=> eve.id == id);

if (encontrado) {
    return encontrado;

} else {
    return undefined;
}

}
/* BUSCAMOS EL PRODUCTO POR ID

getProductById(id)
const foundProductById = this.product.find ((product)=> product.id == id);
if (foundProductById) {
    retun findProductById
} else{
    console.log (`Not Found`);
    return undefined;
}
*/

agregarEvento (
    nombre,
    lugar,
    precio,
    capacidad,
    fecha
    )
    {
        capacidad  = capacidad ?? 50;
        fecha = fecha || Date.now();
        const eventoNuevo = [nombre, lugar, precio, capacidad, fecha];
        this.eventos = [...this.eventos, eventoNuevo];
        return true;

    }
    /* AQUI AÑADIMOS EL PRODUCTO 
    addProduct (
        tittle,
        description,
        thumbnail,
        code,
        stock){



        }
    )
    
*/
}