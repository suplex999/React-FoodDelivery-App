const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  phone: String,
  address: String,
  pincode: String,
  items: [{
    id: String,
    name: String,
    price: Number,
    amount: Number,
    image: String
  }],
  total: Number,
  quantity: Number,
  status: { type: String, default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
