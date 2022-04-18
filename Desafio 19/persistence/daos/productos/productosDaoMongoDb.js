
const ContenedorSql = require ('../../contenedor/contenedorSqlite')

const {options} = require('../../options/sqlite3');

const PERSISTENCIA_PRODUCTOS = 'SQL'

let productosDao
switch (PERSISTENCIA_PRODUCTOS) {
    case 'SQLITE':
        productosDao = new ContenedorSql(options)
        break
    default:
        productosDao = new ContenedorSql(options)
}

 function getProductosDao() {
    return productosDao
}

module.exports = {
    getProductosDao,
  }