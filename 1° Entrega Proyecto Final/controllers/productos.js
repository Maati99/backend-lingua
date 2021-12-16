const { v4: uuidv4 } = require('uuid');
const Producto = require('../utils/productos');
const { borrarProducto, idProducto, crearProductos, actualizarProducto } = require('../services/productos');

const getProductos = (req, res, next) => {
    const { id } = req.params;
    const producto = idProducto(id);

    if (producto === undefined) {
        return res.status(404).json({
            error: -1,
            descripcion: `El producto con ${id} no existe.`
        })
    }

    res.json(producto);
}

const postProductos = async (req, res, next) => {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const producto = new Producto(uuidv4(), nombre, descripcion, codigo, foto, precio, stock);
    const id = await crearProductos(producto);

    res.json({
        id,
        nombre,
        precio,
        foto,
        descripcion,
        stock,
    });
}

const putProductos = async (req, res, next) => {
    const { id } = req.params;
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const producto = await actualizarProducto(id, { nombre, descripcion, codigo, foto, precio, stock });

    if (producto === undefined) {
        return res.status(404).json({
            error: -1,
            descripcion: `El producto con ${id} no existe.`
        })
    }

    res.json(producto);
}

const deleteProducto = async (req, res, next) => {
    const { id } = req.params;
    const producto = await borrarProducto(id);

    if (producto === undefined) {
        return res.status(404).json({
            error: -1,
            descripcion: `El producto con ${id} no existe.`
        })
    }
    
    res.json(producto);
}

module.exports = {
    getProductos,
    postProductos,
    putProductos,
    deleteProducto,
}