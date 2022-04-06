const express = require('express')
let {Router}= require('express')
let {isAuth} = require ('./middleware/auth.js')
let controlador = require ('../controller/controlador')
let passport = require ('passport')

let router = new Router()

router.use(passport.initialize());
router.use(passport.session())

/* --------- REGISTRO ---------- */
 router.get('/register', controlador.registro)

 router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/' }))

 router.get('/failregister', controlador.errorRegistro )

/* --------- LOGIN ---------- */
router.get('/login', controlador.login )

router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/' }))

router.get('/faillogin', controlador.errorLogin)

/* --------- LOGOUT ---------- */
router.get('/logout', controlador.logout)

/* --------- INICIO - AUTENTICACION ---------- */
router.get('/', isAuth, controlador.inicio)
router.get('/pedido-finalizado', controlador.finalizarPed)
router.get('*', controlador.noImplement);

/* --------- RUTAS PRODUCTOS ---------- */

const routerProductos = new Router()
routerProductos.use(express.json())
routerProductos.use(express.urlencoded({ extended: true }))

routerProductos.get('/', controlador.listaProd)

routerProductos.get('/:id', controlador.productoSelec)

routerProductos.post('/', controlador.guardarProd)

routerProductos.put('/:id', controlador.actualizarProd)

routerProductos.delete('/:id', controlador.eliminarProd)

/* --------- RUTAS CARRITO ---------- */

const routerCarrito = new Router()
routerCarrito.use(express.json())
routerCarrito.use(express.urlencoded({ extended: true }))

routerCarrito.post('/', controlador.nuevoCarrito)

routerCarrito.delete('/:id', controlador.eliminarCarrito)

routerCarrito.get('/:id/productos', controlador.productosCarrito)

routerCarrito.post('/:id/productos', controlador.guardarProdCarr)

routerCarrito.delete('/:id/productos/:id_prod', controlador.eliminarProdCarr)


module.exports = { routerCarrito, routerProductos, router}
