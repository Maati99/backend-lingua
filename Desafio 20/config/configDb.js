const MongoStore = require ('connect-mongo')
let mongoose = require('mongoose');
let logger = require ('../winston-module')

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const usuarioSchema = new mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
    nombre: {type: String, require: true},
    direccion: {type: String, require: true},
    edad: {type: Number, require: true},
    numero: {type: String, require: true},
    foto: {type: String, require: true},
})

const usuarioModel = mongoose.model('usuarios', usuarioSchema)

async function CRUD(){
    try{
     await mongoose.connect('mongodb+srv://root:coderhouse@cluster0.gbmxl.mongodb.net/ecommerce?retryWrites=true&w=majority',
         {
           useNewUrlParser: true,
           useUnifiedTopology: true,
           serverSelectionTimeoutMS: 1000
         })
          console.log('Conexion exitosa a la base de datos...');
    }catch(error) {
     logger.error(`Error: ${error}`);
 }
 }

function crearSesionMongo(){
    const mongoRuta= {store: MongoStore.create({ mongoUrl:'mongodb+srv://root:coderhouse@cluster0.gbmxl.mongodb.net/ecommerce?retryWrites=true&w=majority',
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
return mongoRuta
}

async function listarUsuarios(){
    return await usuarioModel.find({})
}

async function guardarUsuario(usuario,contraseña, name, dir, age, number, imagen) {
    const usuarioNuevo = new usuarioModel({ username: usuario,  password: contraseña, nombre: name , direccion: dir, edad: age, numero: number, foto: imagen})
    return await usuarioNuevo.save()
}

module.exports = { CRUD, crearSesionMongo, listarUsuarios, guardarUsuario }