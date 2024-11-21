const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: [/^\S+@\S+\.\S+$/, 'Por favor ingrese un email válido'] },
  passwordHash: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  phone: { type: String, match: [/^\d{10,15}$/, 'Número de teléfono inválido'] },
  country: { type: String },
  state: { type: String },
  city:{ type: String },
  zip: { type: String },
  admin: { type: Boolean, required: true, default: false},
},{timestamps: true});

module.exports = mongoose.model('User', userSchema);