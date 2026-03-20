const mongoose = require('mongoose');
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const asyncHandler = require('../middleware/asyncHandler');

const calculateOrderTotal = async (items) => {
    let total = 0;

    for (const item of items) {
        const product = await Product.findById(item.productId);
        if (!product) {
            throw new Error(`Product not found: ${item.productId}`);
        }

        total += product.price * item.quantity;
    }

    return total;
};

const createOrder = asyncHandler(async (req, res) => {
    const { userId, products, status } = req.body;

    if (!mongoose.isValidObjectId(userId)) {
        res.status(400);
        throw new Error('Invalid user id');
    }

    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
        res.status(404);
        throw new Error('User not found');
    }

    const totalAmount = await calculateOrderTotal(products);

    const order = await Order.create({
        userId,
        products,
        totalAmount,
        status,
    });

    const populatedOrder = await Order.findById(order._id)
        .populate('userId', 'name email role')
        .populate('products.productId', 'title price category');

    res.status(201).json({ success: true, data: populatedOrder });
});

const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find()
        .sort({ createdAt: -1 })
        .populate('userId', 'name email role')
        .populate('products.productId', 'title price category');

    res.json({ success: true, count: orders.length, data: orders });
});

const getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        res.status(400);
        throw new Error('Invalid order id');
    }

    const order = await Order.findById(id)
        .populate('userId', 'name email role')
        .populate('products.productId', 'title price category');

    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    res.json({ success: true, data: order });
});

const updateOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { products, status } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        res.status(400);
        throw new Error('Invalid order id');
    }

    const order = await Order.findById(id);
    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    if (products) {
        order.products = products;
        order.totalAmount = await calculateOrderTotal(products);
    }

    if (status) {
        order.status = status;
    }

    await order.save();

    const populatedOrder = await Order.findById(order._id)
        .populate('userId', 'name email role')
        .populate('products.productId', 'title price category');

    res.json({ success: true, data: populatedOrder });
});

const deleteOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        res.status(400);
        throw new Error('Invalid order id');
    }

    const order = await Order.findByIdAndDelete(id);
    if (!order) {
        res.status(404);
        throw new Error('Order not found');
    }

    res.json({ success: true, message: 'Order deleted successfully' });
});

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
};
