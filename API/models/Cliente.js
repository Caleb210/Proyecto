const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nombre: {type: String, required: true, trim: true},
  telefono: {type: String, required: true, trim: true},
  email: {type: String, lowercase: true, trim: true},
  puntos_fidelidad: {type: Number, default: 0},
  ultima_visita: {type: Date, default: Date.now}
});



module.exports = mongoose.model('Cliente', ClienteSchema);