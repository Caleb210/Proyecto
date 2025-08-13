const mongoose = require('mongoose');

const PlatilloSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  categoria_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'CategoriaMenu', 
    required: true,
    validate: {
      validator: async function(value) {
        const categoria = await mongoose.model('CategoriaMenu').findById(value);
        return categoria !== null;
      },
      message: 'La categoría especificada no existe'
    }
  },
  precio: { type: Number, required: true, min: 0 },
  ingredientes: [{ type: String, trim: true }],
  disponible: { type: Boolean, default: true }
}, { versionKey: false });

module.exports = mongoose.model('Platillo', PlatilloSchema);