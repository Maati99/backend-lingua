const {getProductosDao} = require('../persistence/daos/productos/productosDaoMongoDb')


const sqlproductos = getProductosDao()

async function crearTablaProductos(obj) {
    return await sqlproductos.crearTablaProductos(obj)
}
async function listarProducts() {
    try{
    return await sqlproductos.listarProductos()
    }catch(error){
        console.log(error)
    }
}

async function insertarProducto(obj) {
    return await sqlproductos.insertarProductos(obj)
}



module.exports = { listarProducts, insertarProducto,crearTablaProductos }