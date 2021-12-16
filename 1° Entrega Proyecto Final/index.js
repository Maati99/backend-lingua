let express = require ("express")
const app = express();
let {engine} = require("express-handlebars");
const { conectarCarrito } = require ('../1° Entrega Proyecto Final/services/carrito')
const { conectarProductos } = require ('../1° Entrega Proyecto Final/services/productos')
const serverRouteCarrito = require('./routes/carrito')
const serverRouteProducto = require('./routes/productos')
const PORT = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('./public'))

app.engine("handlebars", engine());
app.set("views", "./views")
app.set("view engine", "handlebars");

const correrUtils = async () => {
    await conectarProductos();
    await conectarCarrito();
}
correrUtils();

app.listen(PORT, () => {
    console.log(`HOLA DESDE MI PUERTO ${PORT}`)
})

serverRouteProducto(app)
serverRouteCarrito(app)