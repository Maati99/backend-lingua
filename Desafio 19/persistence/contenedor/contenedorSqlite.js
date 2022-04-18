const knexLib = require('knex');

class ContenedorSql {
    constructor(config) {
      this.knex = knexLib(config)
    }

    crearTablaProductos() {
          return this.knex.schema.createTable('productos', table => {
            table.string('title', 50).notNullable();
            table.string('price', 10).notNullable();
            table.string('thumbnail', 10).notNullable();
            table.increments('id').primary();
          })
        }

    insertarProductos(producto) {
        return this.knex('productos').insert(producto)
      }

  async  listarProductos() {
        return await this.knex('productos').select('*')
      }

}

module.exports = ContenedorSql