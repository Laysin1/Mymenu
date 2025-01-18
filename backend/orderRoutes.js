const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

router.post('/orders', async (req, res) => {
  try {
    const { tableId, items, total } = req.body;
    if (!tableId || !items || !total) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const newOrder = new Order({ tableId, items, total });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;