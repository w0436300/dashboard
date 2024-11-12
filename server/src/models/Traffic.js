const mongoose = require('mongoose');

const trafficSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true
  },
  pageViews: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Traffic = mongoose.model('Traffic', trafficSchema);
module.exports = Traffic;
