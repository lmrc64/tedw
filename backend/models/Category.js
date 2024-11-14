const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    description: { type: String, required: true },
    category: { type: String, required: true},
  },{timestamps: true});
  
  module.exports = mongoose.model('Category', categorySchema);
  