const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  tableId: { type: String, required: true },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      price: { type: Number, required: true, min: 0 },
    },
  ],
  total: { type: Number, required: true, min: 0 },
  status: { type: String, default: 'pending', enum: ['pending', 'completed'] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);