const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantitySold: { type: Number, default: 0 },
  soldDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
