const fs = require('fs');

class Mensajes{
    constructor(url){
        this.url = url;
        this.init();
    }

    async init(){
        this.mensajes = []
        await this.getAll()
    }

    async save(mensaje){
        this.mensajes.push(mensaje);
        await this.saveFile();
    }

    async getAll(){
        try {
            const data = await fs.promises.readFile(this.url, 'utf-8');
            if(data){
                this.mensajes = JSON.parse(data)
            }else{
                this.mensajes = [];
            }
        } catch (error) {
            console.log(error)
        }
        return this.mensajes;
    }

    async saveFile(){
        try {
            await fs.promises.writeFile(this.url, JSON.stringify(this.mensajes));
        } catch (error) {
            console.log(error)
        }
    }
}


module.exports = Mensajes;