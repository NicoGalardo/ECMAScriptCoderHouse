const express = require('express');
const productManager = require('./productManager');

const app = express();
const port = 3000; // Puedes cambiar el puerto según tus preferencias

// Crea una instancia de ProductManager y especifica la ruta del archivo de productos
const productManager = new ProductManager('products.json');

// Endpoint para obtener la lista de productos
app.get('/products', async (req, res) => {
try {
    const limit = req.query.limit; // Lee el valor del query param "limit"
    const products = await productManager.getProducts();

    if (limit) {
    const limitedProducts = products.slice(0, parseInt(limit, 10));
    res.json(limitedProducts);
    } else {
    res.json(products);
    }
} catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
}
});

// Endpoint para obtener un producto por su ID
app.get('/products/:pid', async (req, res) => {
const productId = parseInt(req.params.pid, 10);

try {
    const product = await productManager.getProductById(productId);

    if (product) {
    res.json(product);
    } else {
    res.status(404).json({ error: 'Producto no encontrado' });
    }
} catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
}
});

app.listen(port, () => {
console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
