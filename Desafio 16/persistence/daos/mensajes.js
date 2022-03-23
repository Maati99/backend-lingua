const ContenedorSql = require ('../container/sqliteContainer')

const {configSqlite} = require( '../options/sqlite3Config');

const getMensajesDao = new ContenedorSql(configSqlite)

module.exports = {
    getMensajesDao
  }