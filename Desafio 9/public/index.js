const socket = io(); // instancia desde el lado del cliente
//---------------------------EVENTOS DE SOCKET --------------------------------------

socket.on('productsList',data=>{
    let products = data.payload;
    fetch('templates/productTable.handlebars').then(string=>string.text()).then(template=>{ // transforma la template en un texto plano
        const processedTemplate = Handlebars.compile(template); // compila la plantilla usando Handlebars
        const templateObject={
            productos: products
        }
        const html = processedTemplate(templateObject); //pasamos la plantilla procesada con el objeto para que substituya el array of pets
        let div = document.getElementById('productTable');
        div.innerHTML=html; // pega el contenido de templates en el div de index.html
    })
})

let user = document.getElementById('email');
let nombre = document.getElementById('name');
let apellido = document.getElementById('last_name');
let age = document.getElementById('age');
let alias = document.getElementById('alias');
let input = document.getElementById('mensaje');
let sendButton = document.getElementById('enviar');
sendButton.addEventListener('click', (e)=>{
    socket.emit('message', {
        author: {
            id:user.value,
            nombre: nombre.value,
            apellido:apellido.value,
            edad:age.value,
            alias:alias.value
        },
        text:input.value
    });
});

socket.on('messagelog', data=>{
    let p = document.getElementById('log');
    if(data && Object.keys(data).length !== 0){
        const schemaAuthor = new normalizr.schema.Entity('author',{},{idAttribute: 'email'});
        const messages = new normalizr.schema.Entity('mensajes',{
            authors:schemaAuthor
        })
        const normalizerData = normalizr.normalize(data,messages);
        console.log(JSON.stringify(normalizerData,null,2))

    let mensajes = data.map(message=>{
        return `<div><span class="user">${message.author.id} <span class="date">${message.createdAt}</span> <span class="message">${message.text}</span><span><img class="avatar" src=${message.author.avatar?message.author.avatar: `https://www.w3schools.com/howto/img_avatar.png`}></span></span></div>`
    }).join('');
    p.innerHTML= mensajes;
    }
})

//-----------------------------FIN DE SOCKET ----------------------------------------------
