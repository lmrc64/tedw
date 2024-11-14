const mongoose = require('mongoose')

const orderSchema =  new mongoose.Schema ({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
        status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' },
      },
    ],
    coupons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' }],
    date: { type: Date, default: Date.now },
    delivery_date: { type: Date },
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    address: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Shipped', 'Delivered'], default: 'Pending' },
  }, {timestamps: true});
  
  module.exports = mongoose.model('Order', orderSchema);
  