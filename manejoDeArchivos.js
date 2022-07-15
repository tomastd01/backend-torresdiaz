const fs = require("fs/promises");

class Container {
    constructor(name) {
        this.fileName = name;
        this.content = [];
    }

    async getAll() {
        try {
            return fs.readFile(this.fileName, "utf-8", (err, data) => {
                this.content = JSON.parse(data)
            })
        } catch (err) {
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
