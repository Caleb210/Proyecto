const express = require('express');
const router = express.Router();
const Empleado = require('../models/Empleado');

router.get('/', async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.get('/:id', async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) return res.status(404).json({message: 'Empleado no encontrado'});
    res.json(empleado);
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

router.post('/', async (req, res) => {
  const empleado = new Empleado(req.body);
  try {
    const nuevoEmpleado = await empleado.save();
    res.status(201).json(nuevoEmpleado);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

router.put('/:id', async (req, res) => {
  try {
    const empleadoActualizado = await Empleado.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(empleadoActualizado);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Empleado.findByIdAndDelete(req.params.id);
    res.json({message: 'Empleado eliminado'});
  } catch (err) {
    res.status(500).json({message: err.message});
  }
});

module.exports = router;
