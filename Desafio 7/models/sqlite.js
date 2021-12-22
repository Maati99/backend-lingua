const Mensajes = require('../config/mensajes');

const sqlite3 = async() => {
    let sqlite = require('knex')({
        client:'sqlite3',
        connection:{filename:'./db/ecomerce.sqlite'}
    });

    const classMensajes = new Mensajes(sqlite, 'mensajes');
    await classMensajes.init();

    console.log("deleteAll: ", await classMensajes.deleteAll(), "\n");

    await classMensajes.save({
        email:'Matias@gmail.com',
        mensaje:'Primer mensaje prueba'
    })
    await classMensajes.save({
        email:'Messi@gmail.com',
        mensaje:'Segundo mensaje prueba'
    })
    await classMensajes.save({
        email:'El_Bicho@gmail.com',
        mensaje:'Tercer mensaje prueba'
    })
}

    module.exports = { sqlite3 }