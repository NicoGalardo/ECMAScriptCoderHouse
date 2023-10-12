const ProductManager = require('./productManager');

const productManager = new ProductManager('products.json');

// Ejemplos de uso
productManager.addProduct({
    title: 'Product 1',
    description: 'Description of product 1',
    price: 19.99,
    thumbnail: 'product1.jpg',
    code: 'P1',
    stock: 10,
});

const products = productManager.getProducts();
console.log(products);

const product = productManager.getProductById(1);

productManager.updateProduct(1, { price: 29.99 });

productManager.deleteProduct(1);
