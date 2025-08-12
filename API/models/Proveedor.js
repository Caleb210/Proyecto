const mongoose = require('mongoose');

const ProveedorSchema = new mongoose.Schema(
    {
        id: { type: Number},
        nombre: { type: String},
        telefono: { type: String},
        productos_suministrados: { type: String}
    }
);


module.exports = mongoose.model('Proveedor', ProveedorSchema);