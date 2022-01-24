let { generateMessages } = require ("../utils.js");
require('dotenv').config()
const mongoose = require('mongoose');
const MONGO_ATLAS = `${process.env.MONGO_DB_ATLAS}`

mongoose.connect(`${MONGO_ATLAS}`, {useNewUrlParser:true, useUnifiedTopology:true})

class MongoContainer{
    constructor(collection,schema,timestamps){
        this.collection = mongoose.model(collection, new mongoose.Schema(schema,timestamps));
    }

    registerMessage = async(mssg) => {
        try{
            const mssgArr = [mssg];
            const newMessages = generateMessages();
            const messages = mssgArr.concat(newMessages);
            let result = await this.collection.create(messages);
            return {status:"success", message:"El mensaje se ha enviado con éxito", messages:result}
        } catch(err){
            return {status: "error desde registerMessage", message: `No se pudo enviar el mensaje: ${err}`}
        }
    }

    getAll = async() =>{
        try{
            let documents = await this.collection.find().lean();
            return {status: "success", payload: documents}
        }catch(err){
            return {status:"error getAll", error: err}
        }
    }


    deleteAll = async() => {
        try {
            await this.collection.deleteMany({});
            return {status: "success", message: "Todos los objetos fueron borrados exitosamente"};
        } catch(err) {
            return {status: "error deleteAll", message: 'No se pudo borrar los objetos'};
        }
    }
}

module.exports = { MongoContainer }