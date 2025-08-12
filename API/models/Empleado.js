const mongoose = require('mongoose');

const EmpleadoSchema = new mongoose.Schema({
  nombre: {type: String, required: true, trim: true},
  puesto: {type: String, enum: ['mesero', 'cocinero', 'administrador'], required: true},
  salario: {type: Number, required: true, min: 0},
  fecha_contratacion: {type: Date, required: true},
  activo: {type: Boolean, default: true}
});


module.exports = mongoose.model('Empleado', EmpleadoSchema);