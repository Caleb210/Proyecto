const mongoose = require('mongoose');

const PlatilloSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  categoria_id: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoriaMenu', required: true },
  precio: { type: Number, required: true, min: 0 },
  ingredientes: [{ type: String }],
  disponible: { type: Boolean, default: true }
});

module.exports = mongoose.model('Platillo', PlatilloSchema);