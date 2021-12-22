const Productos = require('../config/productos')

const mariaDB = async() => {
let mariaDb = require('knex')({
        client:'mysql',
        connection:{
        host:"localhost",
        user:"root",
        password:"123456",
        database:"Desafio_7"
    }
 });

 const cont = new Productos(mariaDb, 'productos');
 await cont.init();

 await cont.save({
    title:'Auriculares',
    price:500,
    thumbnail:'https://www.fullh4rd.com.ar/img/productos/Pics_Prod/auriculares-hyperx-cloud-ii-red-0.jpg'
})

 await cont.save({
    title:'Teclado Gamer',
    price:400,
    thumbnail:'https://cdn.shopify.com/s/files/1/2493/3110/products/teclado-gamer-mecanico-hyperx-alloy-origins-rgb-red-939262_1200x.jpg?v=1606485357'
})
}

module.exports = { mariaDB }