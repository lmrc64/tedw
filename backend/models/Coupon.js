const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
    codigo: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    expiration_date: { type: Date },
    maximum_use: { type: Number },
    status: { type: String, enum: ['Active', 'Expired']},
  },{timestamps: true});
  
  module.exports = mongoose.model('Coupon', couponSchema);
  