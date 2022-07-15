const fs = require("fs/promises");

module.exports = class Container {
    constructor(name) {
        this.fileName = name;
        this.content = [];
    }

    async getAll() {
        try {
            return fs.readFile(this.fileName, "utf8", (err, data) => data)
        } catch(err) {
            console.log(err)
        }  
    }


    async save(obj) {
        try {;
            let products = this.content;

            if (products.length) {
                let last = products[products.length - 1]
                obj.id = last.id + 1;
            } else obj.id = 1;

            this.content.push(obj)
            await fs.writeFile(this.fileName, JSON.stringify(this.content, null, 2))
            return obj.id;

        } catch (err){
            console.log(err)
        } 

    }

    async getById(id) {
        try {
            return this.content.find(product => product.id == id);
        } catch(err) {
            console.log(err)
        }
    }

    async deleteById(id) {
        try {
            let newArray = this.content.filter(product => product.id != id)
            this.content = newArray;
            await fs.writeFile(this.fileName, JSON.stringify(this.content, null, 2))
        } catch {
            console.log(err)
        }
    }

    async deleteAll() {;
        try {
            this.content = []
            await fs.writeFile(this.fileName, JSON.stringify(this.content))
        } catch(err) {
            console.log(err)
        }
    } 
}

/* const sw = {title: "Nintendo Switch", price: 200, url: "https://m.media-amazon.com/images/I/41-a+qwZXgL._SX342_SY445_.jpg"};
const xb = {title: "Xbox Series S", price: 300, url: "https://m.media-amazon.com/images/I/71NBQ2a52CL._SL1500_.jpg"};
const ps = {title: "Playstation 5", price: 400, url:"https://m.media-amazon.com/images/I/619BkvKW35L._SX466_.jpg"};



const file = new Container("./products.json")

async function test() {

    let a = await file.save(sw);
    let b = await file.save(xb);
    let c = await file.save(ps);
    let all = await file.getAll();
    let objById = await file.getById(2);

    let hola = await file.getAll()
    console.log(hola)
}

test(); */
