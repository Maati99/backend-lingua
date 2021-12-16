const fs = require('fs');
const Carrito = require('../utils/carrito');
const { idProducto } = require('../services/productos');

const URL = "./utils/data/carrito.txt"
const carritos = [];

const crearCarrito = async () => {
    const carrito = new Carrito();
    carritos.push(carrito);
    await fs.promises.writeFile(URL, JSON.stringify(carritos, null, 2));
    return carrito;
}

const conectarCarrito = async () => {
    try {
        const file = await fs.promises.readFile(URL, 'utf-8');
        const cartFile = JSON.parse(file);
        cartFile.map(cart => carritos.push(cart));

    } catch (Error) {
        console.log('Error desde conectarCarrito', Error);
    }
}

const agregarProductos = async (id, id_prod) => {

    const indexCarrito = carritos.findIndex(carri => carri.id === id);
    let carrito;

    if (indexCarrito > -1) {
        const producto = idProducto(id_prod);
        carritos[indexCarrito].productos.push(producto);
        carrito = carritos[indexCarrito];
        await fs.promises.writeFile(URL, JSON.stringify(carritos, null, 2));
    }

    return carrito;

}

module.exports = {
    crearCarrito,
    agregarProductos,
    conectarCarrito,
}