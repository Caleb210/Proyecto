const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({message: 'Cliente no encontrado'});
    res.json(cliente);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.post('/', async (req, res) => {
  const cliente = new Cliente(req.body);
  try {
    const nuevoCliente = await cliente.save();
    res.status(201).json(nuevoCliente);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const clienteActualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(clienteActualizado);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.json({message: 'Cliente eliminado'});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

module.exports = router;
