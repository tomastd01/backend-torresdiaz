class User {
    constructor(name, last) {
        this.name = name,
        this.lastName = last,
        this.books = []
        this.pets = []
    }

    getFullName() {
        return `Nombre completo: ${this.name} ${this.lastName}`
    }
    addPet(petName) {
        this["pets"].push(petName);
    }
    countPets() {
        return this["pets"].length
    }
    addBook(author, name) {
        this["books"].push({author: author, name: name})
    }
    getBookNames() {
        return this["books"].map(book => book.name)
    }

}

const user = new User("Armando", "Paredes")


user.addPet("Chucho");
user.addBook("A. Sapkowski", "El último deseo");
user.addBook("G. Orwell", "1984");
console.log(user.getFullName());
console.log(user.countPets());
console.log(user.getBookNames());