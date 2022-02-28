require('dotenv').config()

const configSqlite = {
    client: 'sqlite3',
    connection: {
      filename: process.env.SQLITEFILENAME
    },
    useNullAsDefault: true
  }

 module.exports = {
    configSqlite
}