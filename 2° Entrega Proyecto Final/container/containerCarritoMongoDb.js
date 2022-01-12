const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
let fs = require('fs');
const MONGO_ATLAS = `${process.env.MONGO_DB_ATLAS}`
let { carritoModel } = require('../daos/carritoDaosMongoDb')

let carrito = []

class Carrito {
    constructor(ruta) {
        this.ruta = ruta
        this.id = uuidv4();
        this.timestamp = Date.now();
        this.productos = [];
    }

async leerCarrito(){
    try {
        try{
            const leerArchivo = await fs.promises.readFile(this.ruta, 'utf-8')
            const productsFile = JSON.parse(leerArchivo)
            productsFile.forEach(prd => carrito.push(prd));
            }catch(error){
               console.log(error)
            }
    } catch (Error) {
        console.log('Error desde conectarCarrito', Error);
    }
}

async agregarProductos(id){

    try{
        if(id !== undefined){
            prod = await carritoModel.findById(id);
        }else{
    prod = await carritoModel.find({});
   let countProd = await carritoModel.countDocuments({});
            prod = {
                total: countProd,
                products: prod
            }
        }
}catch(error){
    console.log(error)
}
}

}

(async()=>{
    try{
        let ruta = new Carrito (`${MONGO_ATLAS}`);
        await ruta.agregarProductos()
    }catch(error){
        console.log(error)
    }
})();

module.exports = Carrito