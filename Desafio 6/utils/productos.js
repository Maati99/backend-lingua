class Produ{
    constructor(){
        this.productos = [];
    }
  guardarProducto(producto){
        this.productos.push(producto)
        return producto;
    }
    obtenerProductos(){
        return this.productos
    }
}

module.exports = Produ;