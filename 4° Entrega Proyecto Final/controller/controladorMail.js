let {whatsapp,EtherealMail,twilioClient} = require ('../utils/utilidades');
let logger = require ('../utils/winston-module')

const sendMail = EtherealMail()
const cuentaDePrueba = 'matiaslingua@live.com.ar'
const asunto = 'Nuevo registro'

const from = '+15183512965'
const body = 'Pedido recibido y en proceso'

async function finalizarPed (req, res) {
    logger.info(`Ruta ${req.method} ${req.url} funcionando correctamente`)
    const asuntopedido=  `Nuevo pedido de ${req.user.nombre}, mail de contacto: ${req.user.username}`
    const infopedido = await sendMail({
      to: cuentaDePrueba,
      subject: asuntopedido,
      html: JSON.stringify(req.carritofinal)
    })
    console.log(infopedido)
    const pedidowhatsapp=  `Nuevo pedido de ${req.user.nombre}, mail de contacto: ${req.user.username}`
    const mediaUrl = "https://cdn.shopify.com/s/files/1/0229/0839/files/frases-cortas-de-agradecimiento-a-clientes-por-su-compra_1024x1024.png?format=jpg&quality=90&v=1628759837"
    whatsapp(pedidowhatsapp, mediaUrl)
    const to = '+5492213148908'
    const infomensaje = await twilioClient.messages.create({ body, from, to, mediaUrl })
    console.log(infomensaje)
    res.render ('../views/pedido-finalizado.hbs')
}

module.exports = { finalizarPed }