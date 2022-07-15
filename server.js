const express = require("express");
const fs = require("fs")
const app = express();
const Container = require("./manejoDeArchivos");
const content = new Container("./products.json");


app.get("/", (req, res) => {
    res.send("Root route")
});

app.get("/productos", async (req, res) => {
    res.send(`Productos:\n${await content.getAll()}`)
})

app.get("/productoRandom", async (req, res) => {
    res.send(`Producto random: \n${""}`)
})

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto: ${PORT}`)
});

server.on("error", error => console.log("Error" + error))

