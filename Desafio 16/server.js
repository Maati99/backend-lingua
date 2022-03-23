const express = require('express')
const app = express()
const path = require('path')

const httpServer = require ('http').Server(app);
const io = require ('socket.io')(httpServer);

const {listarMensajes,insertarMensaje,CRUD,crearSesionMongo} = require('./persistence/funciones');
const {router,routerApi} = require('./routes/routes');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

require('dotenv').config()

const session =  require ('express-session')

app.use(session(crearSesionMongo()))

const logger = require('./services/winston-module')

/* ------------------ DATABASE -------------------- */

CRUD();


app.set('view engine', '.hbs')

app.set('views', path.join(__dirname, 'public/plantillas'))

app.use('/api',routerApi)
app.use('/', router)

io.on('connection', async socket => {

    console.log('Nuevo cliente conectado!');

    socket.emit('mensajes', await listarMensajes());
  addAbortSignal+

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await insertarMensaje(mensaje)
        io.sockets.emit('mensajes', await listarMensajes());
    })
});


 /* --------- MINIMIST ---------- */

const parseArgs = require('minimist');

const optionsMinimist = {
    alias: {
        p: 'PORT',
        m: 'modo'
    },
    default: {
        PORT: process.env.PORT || 8080,
        modo: 'FORK'
    }
}

const commandLineArgs = process.argv.slice(2);

const {PORT, modo} = parseArgs(commandLineArgs, optionsMinimist);

/* --------- FORK  ---------- */
//const { fork } = require('child_process')

const { addAbortSignal } = require('stream');
const cluster = require('cluster');

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
    const server =httpServer.listen(PORT, () => {
      logger.info(`Servidor express escuchando en el puerto ${PORT}`)
    });
    server.on('error', error=>logger.error(`Error en servidor: ${error}`));
}
