const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nombre: {type: String, required: true, trim: true},
  rol: {type: String, enum: ['administrador', 'mesero', 'cocinero'], required: true},
  email: {type: String, required: true, unique: true, lowercase: true, trim: true},
  contraseña: {type: String, required: true},
  fecha_registro: {type: Date, default: Date.now}
});


module.exports = mongoose.model('Usuario', UsuarioSchema);