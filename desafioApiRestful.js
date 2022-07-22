const express = require("express");
const app = express();
const {Router} = express;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const productos = [];
const error = {error: "producto no encontrado"};

const routerProductos = Router();

routerProductos.get("/", (req,res) => {
    res.json(productos);
});

routerProductos.get("/:id", (req,res) => {
    const id = req.params.id;
    const producto = productos.find(producto => producto.id == id);

    producto ? res.json(producto) : res.json(error) 
});

routerProductos.post("/", (req, res) => {
    const producto = req.body;

    if (productos.length) {
        let last = productos[productos.length - 1]
        producto.id = last.id + 1;
    } else producto.id = 1;

    productos.push(producto)
    res.json(producto)
});

routerProductos.put("/:id", (req, res) => {
    const id = req.params.id;
    const producto = req.body;
    producto.id = id;
    const index = productos.findIndex(producto => producto.id == id);

    if (index) {
        productos.splice(index, 1, producto);
        res.json(producto);
    } else res.json(error);
    
});

routerProductos.delete("/:id", (req, res) => {
    const id = req.params.id;
    const index = productos.findIndex(producto => producto.id == id);

    index ? productos.splice(index, 1) : res.json()
});


app.use("/api/productos", routerProductos);

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

server.on("error", error => console.log("Error" + error));