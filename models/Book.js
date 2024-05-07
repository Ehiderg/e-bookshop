const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [{ type: String, required: true }], 
  description: {type: String},
  gender: {type: String, required:true},
  price: { type: Number, required: true },
  publicationDate: {type: Date, required: true},
  publishingHouse: {type: String, require:true},
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  active: {type: Boolean, default: true}
});

module.exports = mongoose.model('Book', bookSchema);
