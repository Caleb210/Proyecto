const express = require('express');
const router = express.Router();
const Mesa = require('../models/Mesa');

router.get('/', async (req, res) => {
  try {
    const mesas = await Mesa.find();
    res.json(mesas);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevaMesa = new Mesa(req.body);
    await nuevaMesa.save();
    res.status(201).json(nuevaMesa);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const actualizada = await Mesa.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizada);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Mesa.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Mesa eliminada' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;