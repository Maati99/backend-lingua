let { connection, mongoose } = require('../config/database')
let { Schema, model } = mongoose;
let { productosSchema } = require('../schemas/productos');
let productosSchemaModel = new Schema(productosSchema)
let ProductosModel = new model('productos', productosSchemaModel)

let productos=[
    {'title':'Procesador','descripcion':'Procesador de 8 nucleos 3.6GHz','codigo':'111','foto':'https://imgsob.s3.amazonaws.com/public/ryzen-7-3700X-1.jpg','price':350,'stock':'10','id':1},
    {'title':'Fuente de Poder','descripcion':'Fuente de poder Corsair 650w 80 plus Bronce','codigo':'222','foto':'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_18490_Fuente_Corsair_CV650_650W_80_Plus_Bronze_No_incluye_cable_de_poder_543ac7f0-grn.jpg','price':550,'stock':'5','id':2},
    {'title':'Placa de Video','descripcion':'Placa d video nvidia Geforce 3060ti','codigo':'333','foto':'https://a9u7r3q3.stackpathcdn.com/media/catalog/product/cache/06072195fbc7592cd9b732dacf23ebb1/d/u/dual_3060_ti.png','price': 500,'stock':'3','id':3},
    {'title':'Placa Madre','descripcion':'Placa madre asus Rog b550-f gaming Wifi','codigo':'444','foto':'https://m.media-amazon.com/images/I/81x069mwcbL._AC_SL1500_.jpg','price': 200,'stock':'8','id':4}
  ];

const productosMongoDb = (async ()=> {
    try{
        const inserciones = [];
        for(const producto of productos){
            inserciones.push(ProductosModel.create(producto));
        }
        const result = await Promise.allSettled(inserciones);
        let rejected = result.filter(e => e.status == "rejected");
        console.log('------------------------------------');
        if(rejected.length > 0){
            console.log('Algo fallo');
        }else{
            console.log('Todo 10 puntos en los productos de MongoDB');
        }
    }catch(error){
        console.log(error);
    }
})();

module.exports = { productosMongoDb, ProductosModel, productos}