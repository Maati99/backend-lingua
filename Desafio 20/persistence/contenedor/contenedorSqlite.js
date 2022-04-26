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

  async  insertarProductos(producto) {
      try{
        return await this.knex('productos').insert(producto)
      }catch(error){
        console.log(error)
      }
      }

  async  listarProductos() {
    try{
        return await this.knex('productos').select('*')
      }catch(error){
        console.log(error)
      }
      }

}

module.exports = ContenedorSql