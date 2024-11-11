const mongoose = require('./database');

const categorySchema = mongoose.Schema({
    description: { type: String, required: true },
    category: { type: String, required: true},
  });
  
  module.exports = mongoose.model('Category', categorySchema);
  