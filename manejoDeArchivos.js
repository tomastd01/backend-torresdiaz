class Container {
    constructor(title, price, url) {
        this.title = title;
        this.price = price;
        this.thumbnail = url;
    }
}

const fs = require("fs");

function getAll() {    
    let data = JSON.parse(fs.readFileSync("./products.json", "utf-8"));
    return data
}

function save(obj) {
    let products = getAll();

    if (products.length) {
        let last = products[products.length - 1]
        obj.id = last.id + 1;
    } else obj.id = 1
    
    products.push(obj)
    fs.writeFileSync("./products.json", JSON.stringify(products, null, 2))
    return obj.id
}

function getById(id) {
    let products = getAll();
    return products.find(product => product.id == id);
}

function deleteById(id) {
    let products = getAll();
    let newArray = products.filter(product => product.id != id)
    fs.writeFileSync("./products.json", JSON.stringify(newArray, null, 2))
}

function deleteAll() {;
    fs.writeFileSync("./products.json", "[]")
}

const sw = new Container("Nintendo Switch", 200,"https://m.media-amazon.com/images/I/41-a+qwZXgL._SX342_SY445_.jpg");
const xb = new Container("Xbox Series S", 300,"https://m.media-amazon.com/images/I/71NBQ2a52CL._SL1500_.jpg");
const ps = new Container("Playstation 5", 400,"https://m.media-amazon.com/images/I/619BkvKW35L._SX466_.jpg");

save(sw);
save(xb);
save(ps);
console.log(getById(2));
deleteById(2);
console.log(getAll());
deleteAll();
console.log(getAll());