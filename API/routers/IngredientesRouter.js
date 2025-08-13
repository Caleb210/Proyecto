const express = require('express');
const router = express.Router();
const Ingrediente = require('../models/Ingredientes');

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
    const ingredienteActualizado = await Ingrediente.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(ingredienteActualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Ingrediente.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ingrediente eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;