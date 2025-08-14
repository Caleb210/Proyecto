const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  cliente: { type: String, required: true },
  mesero: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
  estado: {
    type: String,
    enum: ['pendiente', 'completado', 'en_proceso'],
    default: 'pendiente'
  },
  total: { type: Number, required: true }
});

module.exports = mongoose.model('Pedido', PedidoSchema);