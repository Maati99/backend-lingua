const { agregarProductos, crearCarrito } = require('../services/carrito');

const postCarrito = async (req, res, next) => {

    const carrito = await crearCarrito();

    res.json({
        id: carrito.id,
    });
}

const postCarritoProducto = async (req, res, next) => {

    const { id } = req.params;
    const { id_prod } = req.body;

    const carrito = await agregarProductos(id, id_prod);

    if (carrito === undefined) {
        return res.status(404).json({
            error: -1,
            descripcion: `El carrito con ${id} no existe.`
        })
    }

    res.send(carrito);
}

module.exports = {
    postCarrito,
    postCarritoProducto,
}