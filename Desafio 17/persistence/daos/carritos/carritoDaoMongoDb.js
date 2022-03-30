let ContenedorMongoDb = require ('../../contenedor/contenedorMongoDb')

class CarritosDaoMongoDb extends ContenedorMongoDb {

    constructor() {
        super('carritos', {
            productos: { type: [], required: true }
        })
    }

    async guardar(carrito =  { productos: [] }) {
        return await super.guardar(carrito)
    }
}

module.exports = CarritosDaoMongoDb
