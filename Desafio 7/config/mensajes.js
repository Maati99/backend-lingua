class Mensajes{
    constructor(conexion, tabla){
        this.conexion = conexion;
        this.tabla = tabla;
    }

    async init(){
        try {
            await this.conexion.schema.createTable(this.tabla, (table)=>{
                table.increments('id')
                table.string('email')
                table.string('mensaje')
            });
        } catch (error) {
            console.log("Crear tabla error: ", error);
        }
    }

    async save(mensajes){
        let id = -1;
        try {
            await this.conexion(this.tabla).insert({
                email:mensajes.email,
                mensaje:mensajes.mensaje,
            });

            let row = await this.conexion(this.tabla).select('id').orderBy('id', 'desc');
            id = row[0].id;
        } catch (error) {
            console.log("Save error: ", error)
        }

        return id;
    }

    getById = async (id)=> {
        let mensaj = null;
        try {
            mensaj = await this.conexion(this.tabla).where({id:id}).first();
        } catch (error) {
            console.log("getById: ", error);
        }

        return mensaj;
    };

    async getAll(){
        let mensajs = [];
        try {
            mensajs = await this.conexion(this.tabla);
        } catch (error) {
            console.error("getAll:", error)
        }

        return mensajs;
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

module.exports = Mensajes;