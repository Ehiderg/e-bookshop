const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true},
  cedula: {type: Number, required: true, unique:true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  active: {type: Boolean, default: true}
});

module.exports = mongoose.model('User', userSchema);
