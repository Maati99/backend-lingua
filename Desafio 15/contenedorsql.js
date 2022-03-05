const knexLib = require('knex');

class ContenedorSql {
    constructor(config) {
      this.knex = knexLib(config)
    }
    crearTablaMensajes() {
          return this.knex.schema.createTable('mensajes', table => {
            table.string('autor', 50).notNullable();
            table.datetime('fyh');
            table.string('texto', 10).notNullable();
            table.increments('id').primary();
          })

        }
    insertarMensaje(mensaje) {
        return this.knex('mensajes').insert(mensaje)
      }

  async  listarMensajes() {
        return await this.knex('mensajes').select('*')
      }

}

  module.exports = ContenedorSql