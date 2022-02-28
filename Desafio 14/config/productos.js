class Productos{
    constructor(conexion, tabla){
        this.conexion = conexion;
        this.tabla = tabla;
    }

    async init(){
        try {
            await this.conexion.schema.createTable(this.tabla, (table)=>{
                table.increments('id')
                table.string('title')
                table.integer('price')
                table.string('thumbnail')
            });
        } catch (error) {
            console.log("Crear tabla error: ", error);
        }
    }

    async save(producto){
        let id = -1;
        try {
            await this.conexion(this.tabla).insert({
                title:producto.title,
                price:producto.price,
                thumbnail:producto.thumbnail
            });

            let row = await this.conexion(this.tabla).select('id').orderBy('id', 'desc');
            id = row[0].id;
        } catch (error) {
            console.log("Save error: ", error)
        }

        return id;
    }

    getById = async (id)=> {
        let product = null;
        try {
            product = await this.conexion(this.tabla).where({id:id}).first();
        } catch (error) {
            console.log("getById: ", error);
        }

        return product;
    };

    async getAll(){
        let products = [];
        try {
            products = await this.conexion(this.tabla);
        } catch (error) {
            console.error("getAll:", error)
        }

        return products;
    }
    async deleteById(id){
       try {
        await this.conexion(this.tabla).where({id:id}).del();
       } catch (error) {
        console.error("deleteById:", error)
       }
    }
    async deleteAll(){
        try {
            await this.conexion(this.tabla).del();
           } catch (error) {
            console.error("deleteById:", error)
           }
    }
}

module.exports = Productos