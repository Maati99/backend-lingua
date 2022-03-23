const knexLib = require('knex');

class ContenedorSql {
    constructor(config) {
      this.knex = knexLib(config)
    }

    async crearTablaMensajes() {
          return await this.knex.schema.createTable('mensajes', table => {
            table.string('autor', 50).notNullable();
            table.datetime('fyh');
            table.string('texto', 10).notNullable();
            table.increments('id').primary();
          })
        }

    insertarMensaje(mensaje) {
        return this.knex('mensajes').insert(mensaje)
      }

  listarMensajes() {
        return this.knex('mensajes').select('*')
      }

}

  module.exports = ContenedorSql