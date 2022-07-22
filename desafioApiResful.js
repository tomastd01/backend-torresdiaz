const express = require("express");
const app = express();
const {Router} = express;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const productos = []

const routerProductos = Router();

routerProductos.get("/", (req,res) => {
    res.json(productos);
});

routerProductos.get("/:id", (req,res) => {
    const id = res.params.id;
    const producto = productos.find(producto => producto.id == id);

    if(producto) {
        res.json(producto)
    } else {
        res.json({error: "No hay productos con ese id"}) 
    };
});

routerProductos.post("/", (req, res) => {

});

routerProductos.put("/:id", (req, res) => {

});

routerProductos.delete("/:id", (req, res) => {

});


app.use("/api/productos", routerProductos);

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

server.on("error", error => console.log("Error" + error));