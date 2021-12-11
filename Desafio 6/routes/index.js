let Produ = require('../utils/productos')
let data = new Produ
let productos = data.obtenerProductos()

module.exports = (app) => {
    app.get("/", (req, res, next) => {
       res.render("index", { productos })
    })

    app.post("/", (req, res) => {
        const { title, price, thumbnail } = (req.body);
        const newProduct={
          title,
          price,
          thumbnail,
          id:productos.length+1,
      }

     productos.push(newProduct)
        res.redirect("/");
      });
}