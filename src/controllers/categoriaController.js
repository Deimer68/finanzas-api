const Categoria = require('../models/Categoria');

exports.crear = async (req, res) => {
  try {
    const categoria = await Categoria.create({ ...req.body, usuario: req.usuarioId });
    res.status(201).json(categoria);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.obtenerTodas = async (req, res) => {
  try {
    const categorias = await Categoria.find({ usuario: req.usuarioId });
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.obtenerUna = async (req, res) => {
  try {
    const categoria = await Categoria.findOne({ _id: req.params.id, usuario: req.usuarioId });
    if (!categoria) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const categoria = await Categoria.findOneAndUpdate(
      { _id: req.params.id, usuario: req.usuarioId },
      req.body, { new: true }
    );
    if (!categoria) return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    await Categoria.findOneAndDelete({ _id: req.params.id, usuario: req.usuarioId });
    res.json({ mensaje: 'Categoría eliminada' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};