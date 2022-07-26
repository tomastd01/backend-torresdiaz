const express = require("express");
const app = express();
const Controllers = require("./Controllers");
const productCtrl = new Controllers;
const {Router} = express;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const routerProductos = Router();

routerProductos
    .route("/")
    .get(productCtrl.getAll)
    .post(productCtrl.save)

routerProductos
    .route("/:id")
    .get(productCtrl.getById)
    .put(productCtrl.replaceById)
    .delete(productCtrl.deleteById)


app.use("/api/productos", routerProductos);

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

server.on("error", error => console.log("Error" + error));