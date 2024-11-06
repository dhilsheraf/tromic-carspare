const Product = require('../models/Product');


const getProduct =   async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addProduct = async (req, res) => {
    try {
        const { name, price, description, category, stock } = req.body;
        const images = req.body.images; // Images from the resizedImages middleware

        const product = new Product({ name, price, description, category, stock, images });
        await product.save();
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updates = req.body;
        if (req.body.images) updates.images = req.body.images; // Include updated images if provided

        const product = await Product.findByIdAndUpdate(productId, updates, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByIdAndUpdate(productId, { isDeleted: true }, { new: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product soft deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    addProduct,
    editProduct,
    deleteProduct
}