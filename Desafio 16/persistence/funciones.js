const {getMensajesDao} = require('./daos/mensajes')

let mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
})

const usuarioModel = mongoose.model('usuarios', usuarioSchema)

const MongoStore = require ('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const logger = require('../services/winston-module')

async function crear (verificacion){
    if(verificacion === true){
    await getMensajesDao.crearTablaMensajes()
    let verificacion = true
    return verificacion
}else{
    logger.info("TABLA YA CREADA")
}
};

crear()


async function listarMensajes() {
    return await getMensajesDao.listarMensajes()
}

async function insertarMensaje(obj) {
    return await getMensajesDao.insertarMensaje(obj)
}

async function CRUD(){
   try{
    const URI = process.env.MONGOURL;
    await mongoose.connect(URI, 
        { 
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 1000
        })
         console.log('Conectado a la base de datos...');
   } catch(error) {
    throw `Error: ${error}`;
    logger.error(`Error: ${error}`);
}
}

async function listarUsuarios() {
    return await usuarioModel.find({})
}

async function guardarUsuario(usuario,contraseña) {
    const usuarioNuevo = new usuarioModel({ username: usuario,  password: contraseña})
    return await usuarioNuevo.save()
}

function crearSesionMongo(){
    const ruta = {
        store: MongoStore.create({ mongoUrl:  process.env.MONGOURL,
        mongoOptions: advancedOptions, ttl: 100
        }),
        secret: 'secreto',
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            maxAge: 100000
        }
    }
    return ruta
}


module.exports = {
    listarMensajes,
    insertarMensaje,
    CRUD,
    listarUsuarios,
    guardarUsuario,
    crearSesionMongo
}