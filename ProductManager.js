const fs = require('fs');

class ProductManager {
    constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.loadProducts();
}

loadProducts() {
    try {
    const data = fs.readFileSync(this.path, 'utf-8');
    this.products = JSON.parse(data);
    } catch (error) {
    this.products = [];
    }
}

saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
}

addProduct(productData) {
    if (this.validateProductData(productData)) {
    const newProduct = { id: this.generateProductId(), ...productData };
    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
    }
}

validateProductData(productData) {
    return (
    productData.title &&
    productData.description &&
    productData.price &&
    productData.thumbnail &&
    productData.code &&
    productData.stock
    );
}

generateProductId() {
    const ids = this.products.map((product) => product.id);
    const maxId = Math.max(...ids, 0);
    return maxId + 1;
}

getProducts() {
    return this.products;
}

getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (product) {
    return product;
    } else {
    console.log('Product not found');
    }
}

updateProduct(id, updatedProductData) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
this.products[index] = { ...this.products[index], ...updatedProductData };
    this.saveProducts();
    } else {
    console.log('Product not found');
    }
}

deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
    this.products.splice(index, 1);
    this.saveProducts();
    } else {
    console.log('Product not found');
    }
}
}

module.exports = ProductManager;

