const mongoose = require('mongoose');

const CategoriaMenuSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String, trim: true }
});

module.exports = mongoose.model('CategoriaMenu', CategoriaMenuSchema);