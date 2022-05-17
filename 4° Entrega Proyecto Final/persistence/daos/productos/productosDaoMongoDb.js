let ContenedorMongoDb = require ("../../contenedor/contenedorMongoDb")

class ProductosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('productos', {
            nombre: { type: String, required: true },
            precio: { type: Number, required: true },
            foto: { type: String, required: true },
        })
    }
}

module.exports = ProductosDaoMongoDb