const mongoose = require('mongoose')

const productSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    description: { type: String },
    image: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => v.length > 0,
        message: 'At least one image is required',
      },
    },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    status: { type: String, enum: ['New', 'Used'], default: 'New' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  },{timestamps: true});
  
module.exports = mongoose.model('Product', productSchema);