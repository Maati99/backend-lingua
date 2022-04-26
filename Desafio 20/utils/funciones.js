let {listarProducts, insertarProducto, crearTablaProductos} = require ("../persistence/funciones")

async function crearTabla (verificacion){
    if(verificacion === true){
    await crearTablaProductos()
    let verificacion = true
    return verificacion
}else{
    console.log("TABLA YA CREADA")
}
};

async function listadoProductos(){
   return  await listarProducts()
}

async function guardarProducto(producto){
    await insertarProducto(producto)
    console.log("Producto agregado")
  }

  module.exports = {
    listadoProductos,
    guardarProducto,
    crearTabla
  }