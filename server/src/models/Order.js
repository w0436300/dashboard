const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number
  }],
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  },
  channel: { type: String, required: true },
  region: String,  // Geographical distribution analysis
  source: String,  // Traffic source analysis
}, {
  timestamps: true
});



module.exports = mongoose.model('Order', orderSchema);
