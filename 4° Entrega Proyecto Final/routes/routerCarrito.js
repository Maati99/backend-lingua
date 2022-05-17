let express = require ('express')
const { Router } = express
let controlador = require ('../controller/controlador')
process.setMaxListeners(0);
/* --------- RUTAS CARRITO ---------- */
const routerCarrito = new Router()
routerCarrito.use(express.json())
routerCarrito.use(express.urlencoded({ extended: true }))

routerCarrito.post('/', controlador.nuevoCarrito)

routerCarrito.delete('/:id', controlador.eliminarCarrito)

routerCarrito.get('/:id/productos', controlador.productosCarrito)

routerCarrito.post('/:id/productos', controlador.guardarProdCarr)

routerCarrito.delete('/:id/productos/:id_prod', controlador.eliminarProdCarr)

module.exports = {routerCarrito}