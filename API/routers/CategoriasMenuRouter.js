const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const CategoriaMenu = require('../models/CategoriasMenu');

// Obtener una categoría por ID
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'ID no válido' });
    }

    const categoria = await CategoriaMenu.findById(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json(categoria);
  } catch (err) {
    console.error('Error en GET /:id:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const categorias = await CategoriaMenu.find();
    res.json(categorias);
  } catch (err) {
    console.error('Error al obtener categorías:', err);
    res.status(500).json({ message: 'Error al obtener categorías' });
  }
});

// Crear nueva categoría
router.post('/', async (req, res) => {
  try {
    if (!req.body.nombre) {
      return res.status(400).json({ message: 'Nombre es requerido' });
    }

    const nuevaCategoria = new CategoriaMenu({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion
    });

    await nuevaCategoria.save();
    res.status(201).json(nuevaCategoria);
  } catch (err) {
    console.error('Error al crear categoría:', err);
    res.status(400).json({ message: 'Error al crear categoría' });
  }
});

// Actualizar categoría
router.put('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'ID no válido' });
    }

    const categoriaActualizada = await CategoriaMenu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!categoriaActualizada) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.json(categoriaActualizada);
  } catch (err) {
    console.error('Error al actualizar categoría:', err);
    res.status(400).json({ message: 'Error al actualizar categoría' });
  }
});

// Eliminar categoría
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'ID no válido' });
    }

    const categoriaEliminada = await CategoriaMenu.findByIdAndDelete(req.params.id);
    if (!categoriaEliminada) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    res.json({ message: 'Categoría eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar categoría:', err);
    res.status(500).json({ message: 'Error al eliminar categoría' });
  }
});

module.exports = router;