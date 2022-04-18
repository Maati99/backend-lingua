const axios = require('axios')

const endpoint = "http://localhost:8080/api/productos"

function getProducts() {
    return axios.get(endpoint)
}

function addProduct() {
    axios.post(endpoint, {
        nombre: "Auriculares Gamer",
        precio: "500",
        foto: "auris.jpg"
    })
    .then(() => {
       return getProducts()
    })
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
    })
}

addProduct();