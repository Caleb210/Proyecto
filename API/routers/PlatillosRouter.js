const express = require('express');
const router = express.Router();
const Platillo = require('../models/Platillos');

router.get('/', async (req, res) => {
  try {
    const platillos = await Platillo.find().populate('categoria_id');
    res.json(platillos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const platillo = new Platillo(req.body);
  try {
    const nuevoPlatillo = await platillo.save();
    res.status(201).json(nuevoPlatillo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

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

router.delete('/:id', async (req, res) => {
  try {
    await Platillo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Platillo eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;