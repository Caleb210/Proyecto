const mongoose = require('mongoose');

const DetallesPedidoSchema = new mongoose.Schema({
  pedido: { type: String, required: true },     
  plato: { type: String, required: true },      
  cantidad: { type: Number, required: true },
  notas: { type: String }
});

module.exports = mongoose.model('DetallesPedido', DetallesPedidoSchema);