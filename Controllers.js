
module.exports = class Controllers {
    constructor() {
        this.products = [];
    }
    
    getAll = (req, res) => {
        res.json(this.products);
    }

    getById = (req, res) => {
        const id = req.params.id;
        const products = this.products;
        const product = products.find(product => product.id == Number(id));

        product ? 
            res.status(200).json(product) 
            : res.json({error: "Product not found"}) 
    }

    save = (req, res) => {
        const product = req.body;
        const products = this.products;
        const length = products.length

        if (length) {
            let last = products[length - 1]
            product.id = last.id + 1;
        } else product.id = 1;

        products.push(product)
        res.status(200).json(product)
    }

    replaceById = (req, res) => {
        const id = req.params.id;
        const product = req.body;
        product.id = Number(id);
        const index = this.products.findIndex(product => product.id == id);

        if (index) {
            this.products.splice(index, 1, product);
            res.status(200).json(product);
        } else res.json({error: "Product not found"});

    }
    

    deleteById = (req, res) => {
        const id = req.params.id;
        const index = this.products.findIndex(product => product.id == Number(id));

        if (index > -1) {
            this.products.splice(index, 1);
            return res.status(200).json({message:"Product has been removed"})
        }

        return res.status(404).json({error: "Product not found"})
    }

}

