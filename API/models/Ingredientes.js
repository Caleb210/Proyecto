const mongoose = require('mongoose');

const IngredienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  cantidad_stock: { type: Number, required: true, min: 0 },
  proveedor: { type: String, trim: true },
  fecha_vencimiento: { type: Date }
});

module.exports = mongoose.model('Ingrediente', IngredienteSchema);