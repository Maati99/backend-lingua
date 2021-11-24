//import express from "express";
let express = require ("express")
let { Router } = express
let cors = require ("cors")
let { productos } = require ("./utils/productos.js");
let path = require('path');
let app = express();
let router = new Router
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors("*"))
app.use(express.static(path.join(__dirname, "public/")));

app.use("/api/productos", router);

app.listen(PORT, () => {
    console.log(`HOLA DESDE MI PUERTO ${PORT}`)
})

app.get("/api/productos",(req, res)=>{
    if (productos.length==[]){
      return res.status(404).json({
        Error:"No hay productos en la lista",
      });
    }
    res.json(productos);
  });

app.get("/api/productos/:id",(req,res)=>{

    const idSearch=req.params.id;
    const product=productos.find((idProd)=>idProd.id==idSearch);

 if (!product){
      return res.status(404).json({
        Error:"El producto ingresado no existe",
      });
    }
    res.json({
      data:product,
    });
  });

router.post("/", (req, res)=>{

    const { title, price, thumbnail } = req.body;

    const newProduct={
        title,
        price,
        thumbnail,
        id:productos.length+1
    }

    productos.push(newProduct)
    res.json(productos)
});

app.put('/api/productos/:id', (req, res) => {
    const { id } =req.params;
    const product=productos.find((idProd)=>idProd.id==id);

if (!product){
  return res.status(404).json({
    Error:"El producto ingresado no existe",
  });
}
res.json({
  data:product,
});
});

app.delete('/api/productos/:id', (req, res) => {

    const borrarProducto = (id) => {
        let producto = productos.find(x=>x.id == id);
        if(producto){
            productos = productos.filter(x=> x.id != id);
            return producto;
        }else{
            return null;
        }
    }

    const { id } = req.params
    const eliminarProducto = borrarProducto(id);

    if(eliminarProducto){
        res.json(eliminarProducto);
    }
    else{
        res.json({error:`El producto con el id: ${id} no fue encontrado`});
    }
})