const express = require('express')
const app = express()
const httpServer = require ('http').Server(app);
const io = require ('socket.io')(httpServer);
const ContenedorSql = require ('./contenedorsql.js')
require('dotenv').config()
const MONGOURL = `${process.env.MONGO_DB_ATLAS}`
const PORT = 8080
const path =  require ('path')
const session =  require ('express-session')
const MongoStore = require ('connect-mongo')
const {configSqlite} = require( './options/SQLite3.js');
let {productos} = require('./utils/productos')

const sqlmensajes = new ContenedorSql(configSqlite)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

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

/* --------------- AUTENTICACION ---------------- */

function Auth(req, res, next) {
    if (req.session?.nombre) {
        next()
    } else {
        res.redirect('/login')
    }
}

app.get('/', Auth, (req, res) => {
    res.render(path.join(process.cwd(), './public/plantillas/index.hbs'), { nombre: req.session.nombre })
})


app.get("/api/productos-test", (req, res, next) => {
    res.render(path.join("listaProductos.hbs"), { productos })
})

/* --------------- LOGIN POR FORMULARIO Y LOGOUT ------------- */

app.get('/login', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        res.redirect('/')
    } else {
        res.sendFile(path.join(process.cwd(), './public/login.html'))
    }
})

app.set('view engine', 'hbs')

app.set('views', './public/plantillas')

app.get('/logout', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        req.session.destroy(err => {
            if (!err) {
                res.render(path.join(process.cwd(), './public/plantillas/logout.hbs'), { nombre })
            } else {
                res.redirect('/')
            }
        })
    } else {
        res.redirect('/')
    }
})

app.post('/login', (req, res) => {
    req.session.nombre = req.body.nombre
    res.redirect('/')
})

async function crear ( ){
    await sqlmensajes.crearTablaMensajes()
};

crear();

io.on('connection', async socket => {

    console.log('Nuevo cliente conectado!');

    socket.emit('mensajes', await sqlmensajes.listarMensajes());

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await sqlmensajes.insertarMensaje(mensaje)
        io.sockets.emit('mensajes', await sqlmensajes.listarMensajes());
    })
});

httpServer.listen(PORT, () => console.log(`HOLA DESDE MI PUERTO ${PORT}`));