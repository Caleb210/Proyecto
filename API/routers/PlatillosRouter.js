const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Platillo = require('../models/Platillos');

// Obtener un platillo por ID
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'ID de platillo no válido' });
    }

    const platillo = await Platillo.findById(req.params.id)
      .populate('categoria_id', 'nombre _id');

    if (!platillo) {
      return res.status(404).json({ message: 'Platillo no encontrado' });
    }

    res.json(platillo);
  } catch (err) {
    console.error('Error al obtener platillo:', err); 
    res.status(500).json({ message: 'Error del servidor' });
  }
});


// Obtener todos los platillos
router.get('/', async (req, res) => {
  try {
    const platillos = await Platillo.find().populate('categoria_id');
    res.json(platillos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear nuevo platillo
router.post('/', async (req, res) => {
  try {
    if (!req.body.nombre || !req.body.categoria_id || !req.body.precio) {
      return res.status(400).json({
        message: 'Nombre, categoría y precio son requeridos'
      });
    }

    const platillo = new Platillo({
      nombre: req.body.nombre,
      categoria_id: req.body.categoria_id,
      precio: req.body.precio,
      ingredientes: req.body.ingredientes || [],
      disponible: req.body.disponible !== false
    });

    const nuevoPlatillo = await platillo.save();
    res.status(201).json(nuevoPlatillo);
  } catch (err) {
    console.error('Error en POST /platillos:', err);
    res.status(400).json({
      message: err.message,
      errors: err.errors
    });
  }
});

// Actualizar platillo
router.put('/:id', async (req, res) => {
  try {
    const platilloActualizado = await Platillo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('categoria_id');
    res.json(platilloActualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar platillo
router.delete('/:id', async (req, res) => {
  try {
    await Platillo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Platillo eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;