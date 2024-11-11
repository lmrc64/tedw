const mongoose = require('./database');

const couponSchema = mongoose.Schema({
    codigo: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    expiration_date: { type: Date },
    maximum_use: { type: Number },
    status: { type: String, enum: ['Active', 'Expired'], default: 'Active' },
  });
  
  module.exports = mongoose.model('Coupon', couponSchema);
  