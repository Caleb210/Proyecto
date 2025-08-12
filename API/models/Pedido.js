const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  cliente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: false },
  mesero_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true },
  fecha: { type: Date, default: Date.now },
  estado: { type: String, enum: ['pendiente', 'completado', 'en_proceso'], default: 'pendiente' },
  total: { type: Number, required: true }
});

module.exports = mongoose.model('Pedido', PedidoSchema);