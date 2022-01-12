require('dotenv').config()
const mongoose = require('mongoose');
const MONGO_ATLAS = `${process.env.MONGO_DB_ATLAS}`

let connection;

(async ()=> {
    try{
      connection = mongoose.connect(MONGO_ATLAS, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Conexion exitosa!')
    }catch(error){
        console.log(error)
    }
})();

// FIRESTORE

(async = () => {
    try{
    let admin = require("firebase-admin");

let serviceAccount = require("../backendcoderhouse-firebase-adminsdk-deel0-f18385ca1d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
}catch(error){
    console.log(error)
}
})();

module.exports = { connection, mongoose }
