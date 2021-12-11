let {Server: SocketIO} = require('socket.io');
let Produ = require('./productos')
let Mensa = require('../mensajes')
let path = require('path');
const archivoTexto = path.join(__dirname, '../mensajes.txt');
let mensaje = new Mensa(archivoTexto);

class Socket{
    static instancia;
    constructor(http){
        if(Socket.instancia){
            return Socket.instancia;
        }

        Socket.instancia = this;
        this.io = new SocketIO(http);
        this.data = new Produ();
    }
    init(){
        try {
            this.io.on("connection", async (socket) =>{
                console.log('Un usuario se conecto')
                socket.emit("escuchar_productos", this.data.obtenerProductos());
                socket.emit("escuchar_mensajes", await mensaje.getAll());

                socket.on("mensaje", async (data) =>{
                    await mensaje.save(data);
                    this.io.emit('escuchar_mensajes',await mensaje.getAll());
                });


                socket.on("producto", data =>{
                    this.data.guardarProducto(data)
                    this.io.emit('escuchar_productos', this.data.obtenerProductos());
                });
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Socket;