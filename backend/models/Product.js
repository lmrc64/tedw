const mongoose = require('./database');

const productSchema = mongoose.Schema ({
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    status: { type: String, enum: ['New', 'Used'], default: 'New' },
  });
  
module.exports = mongoose.model('Product', productSchema);