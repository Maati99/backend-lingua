let { connection, mongoose } = require('../config/database')
let { Schema, model } = mongoose;
let { productosSchema } = require('../schemas/productos');
let carritoSchemaModel = new Schema(productosSchema)
let carritoModel = new model('carrito', carritoSchemaModel)
let { productos } = require('./productosDaosMongoDb')

let carritos = productos

const carritoMongoDb = (async ()=> {
    try{
        let inserciones = []
        for(const carrito of carritos){
        inserciones.push(carritoModel.create(carrito));
        }
        const result = await Promise.allSettled(inserciones);
        let rejected = result.filter(e => e.status == "rejected");
        console.log('------------------------------------');
        if(rejected.length > 0){
            console.log('Algo fallo');
        }else{
            console.log('Todo 10 puntos en el carrito de MongoDB');
        }
    }catch(error){
        console.log(error);
    }
})();

module.exports = { carritoMongoDb, carritoModel }