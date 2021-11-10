class Usuario {
    constructor (nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }

getFullName() {
    return `El nombre completo es ${this.nombre} ${this.apellido}`
}

addMascota(mascota){
    this.mascotas.push(mascota)
}
countMascota(){
    return this.mascotas.length
}
addBook(libro, autor){
    this.libros.push({libro: libro, autor: autor});
}
getBookNames(){
    return this.libros.map (e => e.libro)
}


}

const USUARIO1 = new Usuario ('Bill', 'Gates')

USUARIO1.addMascota("Perro")
USUARIO1.addMascota("Gato")
USUARIO1.addMascota("Pez")
USUARIO1.addBook("Harry Potter", "J.K Rowling")
USUARIO1.addBook("Señor de los anillos", "J. R. R. Tolkien")

console.log(USUARIO1.getFullName())
console.log(USUARIO1.countMascota())
console.log(USUARIO1.getBookNames())