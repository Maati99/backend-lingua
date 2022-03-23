const socket = io.connect();

const inputMail = document.getElementById('inputMail')
const inputNombre =document.getElementById('inputNombre')
const inputApellido =document.getElementById('inputApellido')
const inputEdad =document.getElementById('inputEdad')
const inputAlias =document.getElementById('inputAlias')
const inputAvatar =document.getElementById('inputAvatar')

const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const formMensaje = document.getElementById('formMensaje')
formMensaje.addEventListener('submit', e => {
    e.preventDefault()
    const author = {
        id: inputMail.value,
        nombre: inputNombre.value,
        apellido: inputApellido.value,
        edad: inputEdad.value,
        alias: inputAlias.value,
        avatar: inputAvatar.value
    }
    console.log(author);
    const autor = JSON.stringify({autor : author})
    const mensaje = { autor, texto: inputMensaje.value }
    socket.emit('nuevoMensaje', mensaje);
})

socket.on('mensajes', mensajes => {
    console.log(mensajes);
    const html = listMensajesHTML(mensajes)
    document.getElementById('mensajes').innerHTML = html;
})

function listMensajesHTML(mensajes) {
    return mensajes.map(mensaje => {
        return (`
            <div>
                <b style="color:blue;">${mensaje.autor}</b>
                [<span style="color:brown;">${mensaje.fyh}</span>] :
                <i style="color:green;">${mensaje.texto}</i>
            </div>
        `)
    }).join(" ");
}