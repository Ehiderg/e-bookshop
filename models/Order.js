const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }],
  total: { type: Number, required: true },
  creationDate: {type: Date, default: Date.now()},
  status: { type: String, default: 'En progreso' },
  active: {type: Boolean, default: true}
});

module.exports = mongoose.model('Order', orderSchema);
