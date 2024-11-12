const mongoose = require('mongoose');

const marketingSchema = new mongoose.Schema({
  channel: { type: String, required: true },
  adSpend: { type: Number, required: true },
  revenue: { type: Number, required: true },
  conversions: { type: Number, required: true },
  clicks: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Marketing', marketingSchema);
