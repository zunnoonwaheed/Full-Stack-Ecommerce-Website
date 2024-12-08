const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  color: { type: String, required: true },
  size: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: Buffer, required: true }, // Store image in binary form
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
