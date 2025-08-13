const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Ingrediente = require('../models/Ingredientes');

router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'ID no válido' });
    }

    const ingrediente = await Ingrediente.findById(req.params.id);
    if (!ingrediente) {
      return res.status(404).json({ message: 'Ingrediente no encontrado' });
    }
    res.json(ingrediente);
  } catch (err) {
    console.error('Error en GET /:id:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

router.get('/', async (req, res) => {
  try {
    const ingredientes = await Ingrediente.find();
    res.json(ingredientes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {

    if (req.body.fecha_vencimiento) {
      req.body.fecha_vencimiento = new Date(req.body.fecha_vencimiento);
    }

    const ingrediente = new Ingrediente(req.body);
    const nuevoIngrediente = await ingrediente.save();
    res.status(201).json(nuevoIngrediente);
  } catch (err) {
    console.error('Error en POST /ingredientes:', err);
    res.status(400).json({
      message: err.message,
      errors: err.errors
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'ID no válido' });
    }

    if (req.body.fecha_vencimiento) {
      req.body.fecha_vencimiento = new Date(req.body.fecha_vencimiento);
    }

    const ingredienteActualizado = await Ingrediente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!ingredienteActualizado) {
      return res.status(404).json({ message: 'Ingrediente no encontrado' });
    }

    res.json(ingredienteActualizado);
  } catch (err) {
    console.error('Error en PUT /:id:', err);
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'ID no válido' });
    }

    const ingrediente = await Ingrediente.findByIdAndDelete(req.params.id);
    if (!ingrediente) {
      return res.status(404).json({ message: 'Ingrediente no encontrado' });
    }

    res.json({ message: 'Ingrediente eliminado' });
  } catch (err) {
    console.error('Error en DELETE /:id:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;