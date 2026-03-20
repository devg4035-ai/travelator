const mongoose = require('mongoose');
const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');

const createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
});

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ success: true, count: products.length, data: products });
});

const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        res.status(400);
        throw new Error('Invalid product id');
    }

    const product = await Product.findById(id);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    res.json({ success: true, data: product });
});

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        res.status(400);
        throw new Error('Invalid product id');
    }

    const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    res.json({ success: true, data: product });
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        res.status(400);
        throw new Error('Invalid product id');
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    res.json({ success: true, message: 'Product deleted successfully' });
});

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
