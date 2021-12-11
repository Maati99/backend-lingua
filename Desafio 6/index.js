let express = require ("express")
let {engine} = require("express-handlebars");
let app = express();
let { Server : HttpServer } = require('http')
let Socket = require('./utils/socket.js')
const serverRoutes = require('./routes')
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('./public'))

app.engine("handlebars", engine());
app.set("views", "./views")
app.set("view engine", "handlebars");

let httpServer = new HttpServer(app)
let socket = new Socket (httpServer)
socket.init()

httpServer.listen(PORT, () => {
    console.log(`HOLA DESDE MI PUERTO ${PORT}`)
})

serverRoutes(app)
