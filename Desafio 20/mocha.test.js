const { notDeepStrictEqual } = require('assert')
const axios = require('axios')

const endpoint = "http://localhost:8080/api/productos"

describe("Comprobando la peticion del post y get de productos", function() {
     before(function() {
        console.log('********* Comienzo TOTAL de Test *********')
    })

    after(function() {
        console.log('********* Fin TOTAL de Test *********')
    })

    it("Guardado del producto y testeo con get", async function(){

        await axios.post(endpoint, {
                                        nombre: "Auriculares Gamer",
                                        precio: "500",
                                        foto: "auris.jpg"
                                    })
        const response = await axios.get(endpoint)
        console.log(response.data)
        let prod;
        notDeepStrictEqual(prod, [
            {
                nombre: "Auriculares Gamer",
                precio: "500",
                foto: "auris.jpg"
            }
        ])

    })

})