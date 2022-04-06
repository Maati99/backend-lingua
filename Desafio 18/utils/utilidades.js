let {listarUsuarios,guardarUsuario} = require ('../config/configDb')
let nodemailer = require ('nodemailer')
let bCrypt = require('bcrypt');
let twilio = require ('twilio')


async function listUser(){
    return await listarUsuarios()
}

function createHash(password){
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null);
}

function validatePassword(password1, password2){
    return  bCrypt.compareSync(password1, password2)
}

async function saveUser(usuario, password, nombre, direccion, edad, numero, foto){
    await guardarUsuario(usuario,createHash(password),nombre, direccion, edad, numero, foto)
    console.log("Usuario agregado con exito")
}

/* ------------------ ETHEREAL -------------------- */

function createSendMail(mailConfig) {
    let transporter = nodemailer.createTransport(mailConfig);
    return function sendMail({ to, subject, text, html, attachments }) {
    let mailOptions = { from: mailConfig.auth.user, to, subject, text, html, attachments };
    return transporter.sendMail(mailOptions)
    }
}

  function EtherealMail() {
    return createSendMail({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'chance.effertz29@ethereal.email',
            pass: '4WuFPTVuJgyH2vDxff'
        }
    })
}

/* ------------------ WHATSAPP -------------------- */

let accountSID = 'ACcf3e27556bbd9eda2bd8aee3707171d4'
let authToken = '4e868f1b6876d251a0b93c4429726ac6'

let twilioClient = twilio(accountSID, authToken)

let numero = '+5492213148908'

async function whatsapp(mensaje, url){
    try {
    const message = await twilioClient.messages.create({
        body: mensaje,
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${numero}`,
        mediaUrl: url
    })
    console.log(message.sid)
  } catch (error) {
    console.log(error)
  }
}

module.exports = { listUser, saveUser, validatePassword, whatsapp, EtherealMail, twilioClient }

