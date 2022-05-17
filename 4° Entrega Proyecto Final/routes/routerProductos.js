let express = require ('express')
const { Router } = express
let controlador = require ('../controller/controlador')

/* --------- RUTAS PRODUCTOS ---------- */
process.setMaxListeners(0);
const routerProductos = new Router()
routerProductos.use(express.json())
routerProductos.use(express.urlencoded({ extended: true }))

routerProductos.get('/', controlador.listaProd)

routerProductos.get('/:id', controlador.productoSelec)

routerProductos.post('/', controlador.guardarProd)

routerProductos.put('/:id', controlador.actualizarProd)

routerProductos.delete('/:id', controlador.eliminarProd)

module.exports = {routerProductos}