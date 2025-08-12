const express = require('express');
const router = express.Router();
const DetallesPedido = require('../models/DetallesPedido');

router.get('/', async (req, res) => {
  try {
    const detalles = await DetallesPedido.find();
    res.json(detalles);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevoDetalle = new DetallesPedido(req.body);
    await nuevoDetalle.save();
    res.status(201).json(nuevoDetalle);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const actualizado = await DetallesPedido.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await DetallesPedido.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Detalle eliminado' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;