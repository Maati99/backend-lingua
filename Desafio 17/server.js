const express = require('express')
let exphbs  = require('express-handlebars');
const app = express()
let {CRUD, crearSesionMongo} = require ('./config/configDb')
let session = require ('express-session')
let { routerCarrito, routerProductos, router } = require ('./routes/routes')
let logger = require ('./winston-module.js')
let cluster = require ('cluster')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('hbs', exphbs({
  extname: ".hbs",
  defaultLayout: "index",
  partialsDir: path.join(__dirname, 'views/partials')

}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(session(crearSesionMongo()))

CRUD();

/* Cargo los routers */
app.use('/api/carrito',routerCarrito)
app.use('/api/productos',routerProductos)
app.use('/', router)

/* Server Listen */
const numCPUs = require('os').cpus().length;
console.log(numCPUs)
const modo = "FORK"

if (modo == "FORK") {
  levantarServer();
} else if (modo== "CLUSTER") {
  if (cluster.isMaster){
      console.log(`Cantidad de CPUs: ${numCPUs}`);
      console.log(`Master PID ${process.pid} is running`);
      for (let i=0; i<numCPUs; i++){
          cluster.fork();
      }
      cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`)
        cluster.fork();});
  } else {
      levantarServer();
  }
}

function levantarServer(){
  const PORT = 8080 || process.env.PORT
  const server = app.listen(PORT, ()=>{
      logger.info(`Servidor express escuchando en el puerto ${PORT}`)
  });
  server.on('error', error=>logger.error(`Error en servidor: ${error}`));
}