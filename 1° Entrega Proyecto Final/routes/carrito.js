const { postCarrito, postCarritoProducto } = require('../controllers/carrito');
const { Router } = require('express');
const router = Router();

module.exports = (app) => {
    app.use('/api/carrito', router);

    router.post('/', postCarrito);

    router.post('/:id/productos', postCarritoProducto);

    router.delete('/:id', (req, res, next) => {
        res.json({
            mensaje: 'Delete carrito ejecutado',
        });
    });

    router.get('/:id/productos', (req, res, next) => {
        res.json({
            mensaje: 'Get carrito ejecutado',
        });
    });

    router.delete('/:id/productos/:id_prod', (req, res, next) => {
        res.json({
            mensaje: 'Delete producto carrito ejecutado',
        });
    });
}