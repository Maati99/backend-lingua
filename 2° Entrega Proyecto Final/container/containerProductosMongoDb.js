require('dotenv').config()
let fs = require('fs')
let { ProductosModel } = require('../daos/productosDaosMongoDb')
const MONGO_ATLAS = `${process.env.MONGO_DB_ATLAS}`

const products = [];

class ProductosContainerMongoDb {
    constructor (ruta){
        this.ruta = ruta
    }

    async leerProductos(){
        try{
        const leerArchivo = await fs.promises.readFile(this.ruta, 'utf-8')
        const productsFile = JSON.parse(leerArchivo)
        productsFile.forEach(prd => products.push(prd));
        }catch(error){
           console.log(error)
        }
    }

    async listar(id){
        let prod, countProd;
        try {
            if (id !== undefined ) {
                prod = await ProductosModel.findById(id);
            } else {
                prod = await ProductosModel.find({});
                countProd = await ProductosModel.countDocuments({});
                prod = {
                    total: countProd,
                    products: prod
                }
            }
        } catch (err) {
           console.log(err);
        }

        return prod;

    }

    async actualizarProductos (id, prod){
        let productosActualizados;

        try {
            productosActualizados = await ProductosModel.findByIdAndUpdate(id, prod, { new: true});
        } catch (err) {
            console.log(err);
        }

        return productosActualizados;

    }
}

(async()=>{
    try{
        let ruta = new ProductosContainerMongoDb (`${MONGO_ATLAS}`);
        console.log(ruta)
        console.log(await ruta.listar())
    }catch(error){
        console.log(error)
    }
})();

module.exports = ProductosContainerMongoDb
