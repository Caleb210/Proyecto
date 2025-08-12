const express = require('express');
const router = express.Router();
const CategoriaMenu = require('../models/CategoriasMenu');

router.get('/', async (req, res) => {
  try {
    const categorias = await CategoriaMenu.find();
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const categoria = new CategoriaMenu(req.body);
  try {
    const nuevaCategoria = await categoria.save();
    res.status(201).json(nuevaCategoria);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const categoriaActualizada = await CategoriaMenu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(categoriaActualizada);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await CategoriaMenu.findByIdAndDelete(req.params.id);
    res.json({ message: 'Categoría eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;