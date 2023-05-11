const express = require("express");
const app = express();
const port = 8080;
app.use(express.urlencoded({ extended: true }));

//ADAPTARLO A NUESTRO PRODUCT MANAGER

let products = [

    { id: "1", name: "pelota", price: 20, },
    { id: "2", name: "cami", price: 30, },
    { id: "3", name: "pantalon", price: 80, }
];

app.get("/products", (req, res) => {
    //ejemplo query ?precio=100 & nombre=pelota
    console.log(req.query);
      const price = req.query.price;
    if (req.query && price) {
        const productsFilterByPrice = products.filter(
            (p) => p.price == price
        );
        return res.json({
            status: "success",
            msg: "all products found with the price = " + price,
            data: productsFilterByPrice,
        });
    }
    else {
        return res.json({
            status: "success",
            msg: " this are all of the products",
            data: products,
        })


    }
    /* return res.json({
         status: "success",
         msg: "all products found with the price = " + req.query.price,
         data: productsFilterByPrice,
     }); */

})
app.get("/products/:id", (req, res) => {

    


    // se buscan los productos por id

    const id = req.params.id;
    const product = products.find((p) => p.id == id);
    if (product) {
        return res.json({
            status: "success",
            msg: "product found",
            data: product,
        });
    }
    else {
        return res.json({
            status: "error",
            msg: "product not found",
            data: {},
        });


    }

   
}); 

app.get("/boca", (req, res) => {
    return res.send("el mejor cuadro del mundo");
});

app.get("*", (req, res) => {
    return res.json({ status: "error", msg: "error de ruta", data: {} });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});



/* ESTE ES EL CODIGO COMPARTIDO POR EL PROFESOR

const express = require("express");
const app = express();
const port = 3000;
 
let productos = [
  { id: "1000000", name: "pelota boca", precio: 100000 },
  { id: "1000001", name: "pelota river", precio: -10 },
  { id: "1000002", name: "pelota tigre", precio: 5 },
];
 
app.get("/productos/:id", (req, res) => {
  const id = req.params.id;
  const producto = productos.find((p) => p.id == id);
  if (producto) {
    return res.json({
      status: "success",
      msg: "producto encontrado con exito",
      data: producto,
    });
  } else {
    return res.json({
      status: "error",
      msg: "no se encontro el producto",
      data: {},
    });
  }
});
 
app.get("/decimehola/:nombre", (req, res) => {
  const nombre = req.params.nombre;
  return res.json({
    status: "success",
    msg: "hola " + nombre + ", como andas?",
    data: {},
  });
 
  /*
  console.log("params", req.params);
  console.log("body", req.body);
  console.log("query", req.query); 
  
});
 
app.get("*", (req, res) => {
  return res.json({
    status: "error",
    msg: "error esa ruta no existe",
    data: {},
  });
  1;
});
 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
}); */