const fs = require("fs");

class Contenedor {
    constructor(url){
        this.url = url
        this.product = []
    }

//CREACION Y GUARDADO DEL DOCUMENTO

async save(title, price, thumbnail){
                                    try {
                                         this.product.push({
                                                            title: title,
                                                            price: price,
                                                            thumbnail: thumbnail,
                                                            id: this.product.length + 1,
                                                          });
                                         await fs.promises.writeFile(this.url, JSON.stringify(this.product, null, 3));
                                         console.log(`Producto ${title} agregado a ${this.url}`);
                                        }
                                    catch (error) {
                                                   console.log('No se pudo agregar un producto');
                                                  }
}

//LECTURA DEL DOCUMENTO

async leerDoc() {
                 try {
                      const leer = await fs.promises.readFile(this.url, 'utf-8');
                      console.log(leer)
                     }
                 catch (error) {
                                console.log('No se pudo leer el archivo');
                               }
}

// BORRADO COMPLETO DEL DOCUMENTO

async deleteAll() {
                    try {
                         await fs.promises.unlink(this.url);
                         console.log(`Documento ${this.url} borrado`);
                        }
                    catch (error) {
                                   console.log('No se pudo borrar Documento');
                                  }
}

// BORRADO DE UN PRODUCTO EN ESPECIFICO
async deleteById() {
                      try {
                           let filtId = await this.product.filter((e)=>{ return e.id !== 5 });
                           await fs.promises.writeFile(this.url, JSON.stringify(filtId, null, 3));
                           console.log(`Producto ${this.url} borrado`);
                           return
                          }
                      catch (error) {
                                     console.log('No se pudo borrar el producto');
                                    }
}
}

const prods = async()=>{
	                    try{
		                    let URL = new Contenedor ("./productos.txt")
		                    await URL.save('Procesador', 350, 'https://imgsob.s3.amazonaws.com/public/ryzen-7-3700X-1.jpg');
		                    await URL.save('Placa Madre', 200, 'https://m.media-amazon.com/images/I/81x069mwcbL._AC_SL1500_.jpg');
		                    await URL.save('Placa de Video', 500, 'https://a9u7r3q3.stackpathcdn.com/media/catalog/product/cache/06072195fbc7592cd9b732dacf23ebb1/d/u/dual_3060_ti.png');
		                    await URL.save('Fuente de poder', 550, 'https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_18490_Fuente_Corsair_CV650_650W_80_Plus_Bronze_No_incluye_cable_de_poder_543ac7f0-grn.jpg');
    // TXT COMPLETO
       getall = async() => {
           let leer = await URL.leerDoc()
           console.log(leer);
             return
        }

        getall()

     // FILTRADO POR ID EN CONSOLA
        getById = async() => {
            try{
            let filtrado = await URL.product.filter((e)=>{ return e.id === 3 } );
            console.log(filtrado)
            return
            }
            catch{
                console.log('ERROR NO SE PUDO FILTRAR')
            }
        }

     //   getById()

		    setTimeout(() => {
		    URL.deleteAll();
		    }, 20000);


    URL.deleteById();
	}
                        catch{
		                    (err)=> {
			                        console.log("Error de productos", err);
		                            };
	                        }
}

prods()

module.exports = Contenedor


