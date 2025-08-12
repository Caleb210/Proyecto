const mongoose = require('mongoose');

const VentaSchema = new mongoose.Schema(
    {
        pedido_id: { type: Number},
        tipo: { type: String},
        monto: { type: Number},
        metodo_pago: { type: String},
        fechaa: { type: String}
    }
);


module.exports = mongoose.model('Venta', VentaSchema);