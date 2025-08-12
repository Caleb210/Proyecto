const mongoose = require('mongoose');

const MesaSchema = new mongoose.Schema({
  numero: { type: Number, required: true, unique: true },
  capacidad: { type: Number, required: true },
  estado: { type: String, enum: ['libre', 'ocupada', 'reservada', 'en_limpieza'], default: 'libre' }
});

module.exports = mongoose.model('Mesa', MesaSchema);