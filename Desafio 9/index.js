let express = require ("express");
let app = express();
let cors = require ('cors')
let {engine} = require("express-handlebars");
let { Server : HttpServer } = require('http');
let {Server} = require ('socket.io');
let {mensajes} = require ('./daos/index.js')
const serverRoutes = require('./routes');
const path = require('path');
let messagesRouter = require ('./routes/messages.js')
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.engine("handlebars", engine());
app.set("views","./views")
app.set("view engine", "handlebars");

app.use(cors());
app.use((req,res,next)=>{
    console.log(new Date().toTimeString().split(" ")[0], req.method, req.url);
    next();
})

let httpServer = new HttpServer(app)

const io = new Server(httpServer)

httpServer.listen(PORT, () => {
  console.log(`HOLA DESDE MI PUERTO ${PORT}`)
})

serverRoutes(app)

app.use(express.static(path.join(__dirname+"/public")));
app.use('/api/messages', messagesRouter);

io.on('connection', async socket=>{
    console.log(`El socket ${socket.id} se ha conectado`)
    console.log('Cliente conectado');
    socket.emit('messagelog', mensajes);
    socket.on('message', data=>{
         const messageArr = mensajes.registerMessage(data).then(res => {return res});
        const prueba = async ()=> {try{console.log(await (messageArr))} catch(error){console.log(error)}}
        prueba()
         messageArr.then(result => {
             io.emit('messagelog', result.messages);
         });
    })
})
