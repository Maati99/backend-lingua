let faker = require('faker/locale/es');

let productos = []

    for(let id = 1;id <=5; id++){
    productos.push([{
    id: productos.length + 1,
    title: faker.commerce.product(),
    price: faker.commerce.price(),
    thumbnail: faker.image.imageUrl()}])
}

module.exports = { productos };