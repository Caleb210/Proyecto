const mongoose = require('mongoose');

const DetallesPedidoSchema = new mongoose.Schema({
  pedido_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Pedido', required: true },
  plato_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Plato', required: true },
  cantidad: { type: Number, required: true },
  notas: { type: String }
});

module.exports = mongoose.model('DetallesPedido', DetallesPedidoSchema);