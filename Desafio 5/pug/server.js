let express = require ("express")
let { productos } = require ("./utils/productos.js");
let path = require('path');
let app = express();
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

app.get("/", (req, res, next) => {
    res.render("index")
})

app.get("/productos", (req, res, next) => {
  res.render("productos", {productos})
})

app.post("/productos", (req, res) => {
  const { title, price, thumbnail } = (req.body);
  const newProduct={
    title,
    price,
    thumbnail,
    id:productos.length+1
}

productos.push(newProduct)
  res.redirect("/productos");
});

app.listen(PORT, () => {
    console.log(`HOLA DESDE MI PUERTO ${PORT}`)
})

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