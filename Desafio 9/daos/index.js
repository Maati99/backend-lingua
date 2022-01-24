let { MensajeMongo } = require ('./mensajesDaos')
let persistence = 'mongo';

let mensajes

switch(persistence){
    case "mongo":
        mensajes = new MensajeMongo();
        break;
    default:

}

module.exports = { mensajes }