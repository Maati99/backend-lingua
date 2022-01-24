let {productos} = require('../utils/productos')
//let data = new Produ
//let productos = data.obtenerProductos()
 console.log(productos)

module.exports = (app) => {
    app.get("/api/productos-test", (req, res, next) => {
       res.render("index", { productos })
    })

 /*   app.get("/", (req, res, next) => {
      const inicio = `<h1 style="text-align:center; margin:150px; background:#B7A1C6">Bienvenido para ver los 5 productos navegar a /api/productos-test</h1>`
      res.send(inicio)
   })*/
}