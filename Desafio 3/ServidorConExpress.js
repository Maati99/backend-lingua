const Contenedor = require('../Desafio 2/contenedor.js');
express = require("express");
const fs = require("fs");
let app = express();
const PORT = 8080

let server = new Contenedor('./productos.txt')

app.get('/', async (req,res) => {
    const inicio = "<h1><center>BIENVENIDO NAVEGA POR LAS SIGUIENTES RUTAS: <hr><i>/productos y /productoRandom</i></hr></center></h1>"
    res.send(inicio)
})

app.get('/productos', async (req,res) => {
    let productos = await fs.promises.readFile(server.url, 'utf-8');
    const PARSE = JSON.parse(productos)
    res.send(PARSE)
    return
})

app.get('/productoRandom', async (req,res) => {
        let lectura = await fs.promises.readFile(server.url,'utf-8');
		const PARSEADO = JSON.parse(lectura);
		let productoRandom = PARSEADO[Math.floor(Math.random()*PARSEADO.length)];
		res.json({
			producto:productoRandom,
		});
})

app.listen(PORT, () => {
    console.log(`HOLA DESDE MI PUERTO ${PORT}`)
})