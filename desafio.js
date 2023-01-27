const fs = require('fs')

let products = []

class ProductManager {
    constructor(filename) {
        this.filename = filename
    }

    createProduct = async(id, title, description, price, thumbnail, code, stock) => {
        let id
        if (products.length === 0) id = 1
        else id = products[products.length-1].id + 1 
        products.push({id, title, description, price, thumbnail, code, stock})
        fs.writeFileSync(this.filename, JSON.stringify(products, null, 2))
    }


    async getProducts() {
        let data = await fs.promises.readFile(this.path, 'utf8');
        return JSON.parse(data);
    }
    
    async getProductById(id) {
        let products = await this.getProducts();
        return products.find(product => product.id === id);
    }
    
    async updateProduct(id, product) {
        let products = await this.getProducts();
        let index = products.findIndex(p => p.id === id);
        products[index] = {...products[index], ...product};
        await fs.promises.writeFile(this.path, JSON.stringify(products));
    }
    
    async deleteProduct(id) {
        let products = await this.getProducts();
        products = products.filter(product => product.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(products));
    }
}


async function desafio() {
    const manager = new ProductManager('products.json')
    await manager.createProduct('Stripes', 'playera rayada de blanco y negro', 350, 'https://m.media-amazon.com/images/I/51IKhmEXcjL._AC_SX569_.jpg', '101010', 30)
    await manager.createProduct('Levis Black', 'playera negra con logo rojo de levis',550, 'https://cdn.shopify.com/s/files/1/0366/8626/6503/products/1778301375_600x600.png?v=1599697326', '101011', 25)
}

desafio()




