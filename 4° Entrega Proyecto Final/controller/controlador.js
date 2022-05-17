let controladorUsuarios = require("../controller/controladorUsuarios")
let controladorProductos = require("../controller/controladorProductos")
let controladorMail = require("../controller/controladorMail")
let controladorCarrito = require("../controller/controladorCarrito")
let {carritosDao}  = require ('../persistence/index')
let {productosDao}  = require ('../persistence/index')
let logger = require ('../utils/winston-module')

async function inicio (req, res)  {
    const carritos = await carritosDao.getAll()
    const resultado = carritos.find( carrito => carrito.username === req.user.username);
    const products= await productosDao.getAll()
    if (resultado==undefined){
        const carritoNuevo = {username: req.user.username}
        const cartTest = await carritosDao.save(carritoNuevo)
        const productoSel = await carritosDao.getByID(cartTest)
        const carritofinal= JSON.stringify (productoSel.productos)
        if (products.length==0){
            res.render('index', { listadoProd: products, listExists: false, email: req.user.username, direccion: req.user.direccion,nombre: req.user.nombre,edad: req.user.edad,numero: req.user.numero,foto: req.user.foto, carrito:  carritofinal} )
        } else {res.render('index', { listadoProd: products, listExists: true, email: req.user.username, direccion: req.user.direccion,nombre: req.user.nombre,edad: req.user.edad,numero: req.user.numero,foto: req.user.foto, carrito:  carritofinal })}
    }
    else{
        const carritofinal= JSON.stringify (resultado.productos)
        if (products.length==0){
            res.render('index', { listadoProd: products, listExists: false, email: req.user.username, direccion: req.user.direccion,nombre: req.user.nombre,edad: req.user.edad,numero: req.user.numero,foto: req.user.foto,  carrito: carritofinal} )
        } else {res.render('index', { listadoProd: products, listExists: true, email: req.user.username, direccion: req.user.direccion,nombre: req.user.nombre,edad: req.user.edad,numero: req.user.numero,foto: req.user.foto, carrito: carritofinal })}
    }
 }

function noImplement(req, res, next) {
    const rutaincorrecta= {error:-2, descripcion: `Ruta ${req.url} metodo ${req.method} no implementada`}
    logger.warn(`Ruta ${req.method} ${req.url} no implementada`)
    res.send(rutaincorrecta)
    next();
}

const registro = controladorUsuarios.registro
const errorRegistro = controladorUsuarios.errorRegistro

const login = controladorUsuarios.login
const errorLogin = controladorUsuarios.errorLogin
const logout = controladorUsuarios.logout

const listaProd = controladorProductos.listaProd

const productoSelec = controladorProductos.productoSelec
const guardarProd = controladorProductos.guardarProd
const actualizarProd = controladorProductos.actualizarProd
const eliminarProd = controladorProductos.eliminarProd

const nuevoCarrito = controladorCarrito.nuevoCarrito
const eliminarCarrito = controladorCarrito.eliminarCarrito
const productosCarrito = controladorCarrito.productosCarrito
const guardarProdCarr = controladorCarrito.guardarProdCarr
const eliminarProdCarr = controladorCarrito.eliminarProdCarr

const finalizarPed = controladorMail.finalizarPed

module.exports = {
noImplement,
registro,
errorRegistro,
login,
errorLogin,
logout,
listaProd,
productoSelec,
guardarProd,
actualizarProd,
eliminarProd,
nuevoCarrito,
eliminarCarrito,
productosCarrito,
guardarProdCarr,
eliminarProdCarr,
inicio,
finalizarPed
}