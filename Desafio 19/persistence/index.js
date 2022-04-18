let productosDao
let carritosDao


process.env.PERS='mongodb'

 switch (process.env.PERS) {
    case 'mongodb':
        //const ProductosDaoMongoDb  =  require('./daos/productos/productosDaoMongoDb')
        const CarritosDaoMongoDb =  require('./daos/carritos/carritoDaoMongoDb')

     //   productosDao = new ProductosDaoMongoDb()
        carritosDao = new CarritosDaoMongoDb()
        break
}

module.exports =  {productosDao, carritosDao} ;