const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyer: { type: Number, ref: 'User', required: true, inmutable: true},
  seller: { type: Number, ref: 'User', required: true, inmutable: true},
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true , inmutable: true}],
  total: { type: Number, required: true, inmutable: true},
  creationDate: {type: Date, default: Date.now(), inmutable: true},
  status: { type: String, default: 'En progreso' },
  active: {type: Boolean, default: true}
});

module.exports = mongoose.model('Order', orderSchema);
