const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema(
    {
        cliente_id: { type: Number},
        mesa_id: { type: Number},
        fecha_reservacion: { type: String},
        clientes: { type: Number}
    }
);


module.exports = mongoose.model('Reserva', ReservaSchema);