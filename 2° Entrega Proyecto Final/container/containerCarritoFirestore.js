let admin = require("firebase-admin");

const db = admin.firestore()
const query = db.collection('carritos')

class carritoFirebase{
    constructor(){
        this.db = db
        this.query = query
    }

    async carrito(){
        try{
            let id = 1
            let doc = query.doc(`${id}`);
            await doc.create({title:'Procesador',descripcion:'Procesador de 8 nucleos 3.6GHz',foto:'https://imgsob.s3.amazonaws.com/public/ryzen-7-3700X-1.jpg',price:350});
            id++
            doc = query.doc(`${id}`);
            await doc.create({title:'Fuente de Poder',descripcion:'Fuente de poder Corsair 650w 80 plus Bronce',foto:'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_18490_Fuente_Corsair_CV650_650W_80_Plus_Bronze_No_incluye_cable_de_poder_543ac7f0-grn.jpg',price:550});
            id++
            doc = query.doc(`${id}`);
            await doc.create({title:'Placa de Video',descripcion:'Placa d video nvidia Geforce 3060ti',foto:'https://a9u7r3q3.stackpathcdn.com/media/catalog/product/cache/06072195fbc7592cd9b732dacf23ebb1/d/u/dual_3060_ti.png',price: 500});
            id++
            doc = query.doc(`${id}`);
            await doc.create({title:'Placa Madre',descripcion:'Placa madre asus Rog b550-f gaming Wifi',foto:'https://m.media-amazon.com/images/I/81x069mwcbL._AC_SL1500_.jpg',price: 200})
            console.log(response, "Todo 10 puntos en el carrito de firebase");
        }catch(error){
            console.log(error)
        }
    }
    async leer(){
        try{
            const querySnapshot = await query.get()
            let docs = querySnapshot.docs;

            const response = docs.map((doc) => ({
                id: doc.id,
                title: doc.data().title,
                descripcion: doc.data().descripcion,
                foto: doc.data().foto,
                price: doc.data().price,
            }))
            console.log(response, "Todo 10 puntos en los productos de firebase");
        }catch(error){
            console.log(error)
        }
    }
}

(async = () => {
    let prueba = new carritoFirebase
    prueba.carrito()
    prueba.leer()
})();

module.exports = carritoFirebase