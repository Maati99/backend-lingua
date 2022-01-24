let faker = require('faker/locale/es');

const generateMessages = () => {
    let messages = [];
    for(let i = 0; i < 4; i++) {
        messages.push({
            author:{
                id: faker.internet.email(),
                nombre:faker.name.firstName(),
                apellido:faker.name.lastName(),
                edad:faker.commerce.price(18, 64, 0, null),
                alias:faker.name.findName(),
                avatar:faker.image.imageUrl()
            },
            text:faker.lorem.sentence()
        })

    }
    return messages;
}

module.exports =  {generateMessages}