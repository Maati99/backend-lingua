const {getProductosDao} = require('../persistence/daos/productos/productosDaoMongoDb')


const sqlproductos = getProductosDao()

async function crearTablaProductos(obj) {
    return await sqlproductos.crearTablaProductos(obj)
}
async function listarProducts() {
    return await sqlproductos.listarProductos()
}

async function insertarProducto(obj) {
    return await sqlproductos.insertarProductos(obj)
}



module.exports = { listarProducts, insertarProducto,crearTablaProductos }