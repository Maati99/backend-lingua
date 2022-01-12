let express = require ("express")
const app = express();
let {engine} = require("express-handlebars");
let ProductosContainerMongoDb = require("./container/containerProductosMongoDb")
prod = new ProductosContainerMongoDb;
let { ProductosFirebase } = require('./container/containerProductosFirebase')
prodFirebase =  new ProductosFirebase
let carritoFirebase = require('./container/containerCarritoFirestore')
cartFirebase = new carritoFirebase
let Carrito = require("./container/containerCarritoMongoDb")
cart = new Carrito;
const PORT = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('./public'))

app.engine("handlebars", engine());
app.set("views", "./views")
app.set("view engine", "handlebars");

app.listen(PORT, () => {
    console.log(`HOLA DESDE MI PUERTO ${PORT}`)
})