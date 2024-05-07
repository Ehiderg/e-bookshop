const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }],
  total: { type: Number, required: true },
  creationDate: {type: Date, required: true},
  status: { type: String, default: 'En progreso' }
});

module.exports = mongoose.model('Order', orderSchema);
