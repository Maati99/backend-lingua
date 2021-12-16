const { getProductos, postProductos, putProductos, deleteProducto } = require ('../controllers/productos')
const { rol } = require ('../middleware/rol')
const { Router } = require('express');
const router = Router();

module.exports = (app) => {
  app.use('/api/productos', router);

  router.get('/:id',getProductos);

  app.get('/productos', (req, res, next) => {
    res.render('index')
  })
  app.post('/productos',postProductos);

  router.post('/', [ rol ] ,postProductos);

  router.put('/:id', [ rol ] ,putProductos);

  router.delete('/:id', [ rol ] ,deleteProducto);
}
