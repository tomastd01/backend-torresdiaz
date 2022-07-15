const fs = require("fs/promises");
const express = require("express");
const app = express();

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
}

const file = new Container("./products.json")

app.get("/", (req, res) => {
    res.send("Root route")
});

app.get("/productos", (req, res) => {
    res.send(`Productos:\n${file.content}`)
})

app.get("/productoRandom", (req, res) => {
    res.send(`Producto random: \n${file.content[0]}`)
})

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto: ${PORT}`)
});

server.on("error", error => console.log("Error" + error))


