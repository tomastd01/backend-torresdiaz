const fs = require("fs");

function getAll() {    
    let data = JSON.parse(fs.readFileSync("./products.json", "utf-8"));
    return data
}

function save(obj) {
    let products = getAll();
    let last = products[products.length - 1]
    products.forEach(product => {
        if(product.id) {
            obj.id = last.id + 1;
        } else obj.id = 1; 
    })

    products.push(obj)
    fs.writeFileSync("./products.json", JSON.stringify(products))
    return obj.id
}

function getById(id) {
    let products = getAll();
    return products.find(product => product.id == id);
}

function deleteById(id) {
    let products = getAll();
    let newArray = products.filter(product => product.id != id)
    fs.writeFileSync("./products.json", JSON.stringify(newArray))
}

function deleteAll() {;
    fs.writeFileSync("./products.json", "")
}


/*
    save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
    getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
    deleteAll(): void - Elimina todos los objetos presentes en el archivo.

    El método save incorporará al producto un id numérico, que deberá ser siempre uno más que el id del último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
    Tomar en consideración el contenido previo del archivo, en caso de utilizar uno existente.
    Implementar el manejo de archivos con el módulo fs de node.js, utilizando promesas con async/await y manejo de errores.
    Probar el módulo creando un contenedor de productos, que se guarde en el archivo: “productos.txt”
    Incluir un llamado de prueba a cada método, y mostrando por pantalla según corresponda para verificar el correcto funcionamiento del módulo construído. 

*/