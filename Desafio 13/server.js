const express = require('express')
const app = express()
const httpServer = require ('http').Server(app);
const io = require ('socket.io')(httpServer);
const ContenedorSql = require ('./contenedorsql.js')
require('dotenv').config()
const MONGOURL = `${process.env.MONGO_DB_ATLAS}`
const session =  require ('express-session')
const MongoStore = require ('connect-mongo')
const {configSqlite} = require( './options/SQLite3.js');
let {productos} = require('./utils/productos')
const passport = require('passport');
const path =  require ('path')
let mongoose = require('mongoose');
const bCrypt = require('bcrypt');

const sqlmensajes = new ContenedorSql(configSqlite)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

const { Strategy: LocalStrategy } = require('passport-local');

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(session({
    store: MongoStore.create({ mongoUrl:MONGOURL,
    mongoOptions: advancedOptions, ttl: 600
}),
secret: 'secreto',
resave: false,
saveUninitialized: false,
rolling: true,
cookie: {
    maxAge: 600000
}
}))

/* ------------------ DATABASE -------------------- */

const usuarioSchema = new mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
})

const usuarioModel = mongoose.model('usuarios', usuarioSchema)


CRUD();

async function CRUD(){
   try{
    await mongoose.connect(MONGOURL, 
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 1000
        })
         console.log('Conexion exitosa a la base de datos...');
   }catch(error) {
    throw `Error: ${error}`;
}
}
// HASTA ACA MONGOOSE

/* ------------------ PASSPORT -------------------- */

passport.use('register', new LocalStrategy({
    passReqToCallback: true
  }, async (req, username, password, done) => {

  let usuarios = await usuarioModel.find({})
  const usuario = usuarios.find(usuario => usuario.username == username)

    if (usuario) {
      return done((null, false))
   }

    const user = {
      username,
      password,
    }

  try{
    const usuarioNuevo = new usuarioModel({ username: username,  password: createHash(password)})
      usuarioNuevo.save()
    console.log('usuario agregado!')}catch (error) {
      console.log(`Error en operación de base de datos ${error}`)
  }

    return done(null, user)
}));

function createHash(password){
      return bCrypt.hashSync(
          password,
          bCrypt.genSaltSync(10),
          null);
}
passport.use('login', new LocalStrategy(async (username, password, done) => {

    let usuarios = await usuarioModel.find({})
    const user = usuarios.find(usuario => usuario.username == username)

    if (!user) {
      return done(null, false)
    }

    if (user.password != password) {
      return done(null, false)
    }

    return done(null, user);
}));

passport.serializeUser(function (user, done) {
    done(null, user.username);
});

passport.deserializeUser(async function (username, done) {
    let usuarios = await usuarioModel.find({})
    const usuario = usuarios.find(usuario => usuario.username == username)
    done(null, usuario);
});

app.use(passport.initialize());
app.use(passport.session());

  /* --------------------- AUTENTICACION --------------------------- */

function isAuth(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect('/login')
    }
  }

/* --------------------- ROUTES --------------------------- */

// REGISTER
app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/plantillas/register.html')
})

app.post('/register', passport.authenticate('register', { failureRedirect: '/failregister',successRedirect: '/' }))

app.get('/failregister', (req, res) => {
    res.render('register-error');
})

// LOGIN SOLO SE INGRESA CON LA CONTRASEÑA ENCRIPTADA QUE SE ENVIA A LA DB
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html')
})

app.post('/login', passport.authenticate('login', { successRedirect: '/', failureRedirect: '/faillogin' }))

app.get('/faillogin', (req, res) => {
    res.render('login-error');
})

app.get("/api/productos-test", (req, res, next) => {
    res.render(path.join("listaProductos.hbs"), { productos })
})

app.set('view engine', 'hbs')

app.set('views', './public/plantillas')

/* --------- LOGOUT ---------- */
app.get('/logout', (req, res) => {
 let nombre = req.user.username
    if (nombre) {
        req.session.destroy(err => {
            if (!err){
                res.render(path.join(process.cwd(), './public/plantillas/logout.hbs'), { nombre })
                req.logout();
            }else{
                res.redirect('/')
            }
        })
    }else{
        res.redirect('/')
    }
  })

app.get('/', isAuth, (req, res) => {
    res.render(path.join(process.cwd(), '/public/plantillas/index.hbs'), {nombre: req.user.username} )
    console.log(req.user.username)
})

async function crear ( ){
    await sqlmensajes.crearTablaMensajes()
};

crear();

io.on('connection', async socket => {

    console.log('Nuevo usuario conectado!');

    socket.emit('mensajes', await sqlmensajes.listarMensajes());

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await sqlmensajes.insertarMensaje(mensaje)
        io.sockets.emit('mensajes', await sqlmensajes.listarMensajes());
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
         PORT: 8080,
         modo: 'FORK'
     }
}

const commandLineArgs = process.argv.slice(2);

const {PORT, modo} = parseArgs(commandLineArgs, optionsMinimist);

/* --------- PROCESS ---------- */
const args = process.argv

const argumentosDeEntrada = args.slice(2)
const plataforma= process.platform
const versionNode= process.version
const memoriaReservada= process.memoryUsage().rss
const pathEjecucion= process.execPath
const processId= process.pid
const carpetaProyecto= process.cwd()

const numerosCpu = require('os').cpus().length;

const info = {
  argumentosDeEntrada,
  plataforma,
  versionNode,
  memoriaReservada,
  pathEjecucion,
  processId,
  carpetaProyecto,
  numerosCpu,
}

app.get('/info', (req, res) => {
  res.json({ info })
})

/* --------- FORK ---------- */

const { fork } = require('child_process')

app.get('/api/randoms', (req, res) => {
  const random = fork(path.resolve(__dirname, 'randomNumber.js'))
  const { cant } = req.query
  if (cant==undefined){
    random.send(100000000)
  }else{
    random.send(Number(cant))
  }

  random.on('message', resultado => {
      res.json({ resultado })
  })
})


const cluster = require('cluster');


if (modo == "FORK") {
  levantarServer();
} else if (modo == "CLUSTER") {
  if (cluster.isMaster){
      console.log(`Cantidad de CPUs: ${numerosCpu}`);
      console.log(`Master PID ${process.pid} is running`);
      for (let i=0; i<numerosCpu; i++){
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
  const server = httpServer.listen(PORT, ()=>{
      console.log('Servidor HTTP escuchando en el port', server.address().port);
  });
  server.on('error', error=>console.log('Error en servidor', error));
}

//httpServer.listen(PORT, () => console.log(`HOLA DESDE MI PUERTO ${PORT}`));
