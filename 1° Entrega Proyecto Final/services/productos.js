const fs = require('fs');
const productos = []

const URL = './utils/data/productos.txt'

const conectarProductos = async () => {
    try {
        const archivo = await fs.promises.readFile(URL, 'utf-8');
        const arhchivoProd = JSON.parse(archivo);
        arhchivoProd.forEach(prod => productos.push(prod));

    } catch (error) {
        console.log('Error desde conectarProductos');
    }
}

const crearProductos = async (producto) => {
    productos.push(producto);
    await fs.promises.writeFile(URL, JSON.stringify(productos, null, 2));
    return producto.id;
}

const idProducto = (id) => {
    const producto = productos.find(prod => prod.id === id && (!prod.borrado) );
    return producto;
}

const actualizarProducto = async (id, prod) => {
    const indexProductos = productos.findIndex(prod => prod.id === id && (!prod.borrado));
    let producto;

    if (index !== -1) {
       productos[indexProductos].nombre = prod.nombre !== undefined ? prod.nombre : productos[indexProductos].nombre ;
       productos[indexProductos].descripcion = prod.descripcion !== undefined ? prod.descripcion : productos[indexProductos].descripcion ;
       productos[indexProductos].codigo = prod.codigo !== undefined ? prod.codigo : productos[indexProductos].codigo ;
       productos[indexProductos].foto = prod.foto !== undefined ? prod.foto : productos[indexProductos].foto ;
       productos[indexProductos].precio = prod.precio !== undefined ? prod.precio : productos[indexProductos].precio ;
       productos[indexProductos].stock = prod.stock !== undefined ? prod.stock : productos[indexProductos].stock ;
       producto = productos[indexProductos];
       await fs.promises.writeFile(URL, JSON.stringify(productos, null, 2));
    }
    return producto;
}

const borrarProducto = async(id) => {
    const indexProducto = productos.findIndex(prod => prod.id === id && (!prod.borrado));
    if (indexProducto !== -1) {
        productos[indexProducto].borrado = true;
        await fs.promises.writeFile(pathFile, JSON.stringify(productos, null, 2));
    }
    return productos[indexProducto];
}

module.exports = {
    conectarProductos,
    crearProductos,
    idProducto,
    actualizarProducto,
    borrarProducto,
}