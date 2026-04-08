const Presupuesto = require('../models/Presupuesto');
const Transaccion = require('../models/Transaccion');

exports.crear = async (req, res) => {
  try {
    const presupuesto = await Presupuesto.create({ ...req.body, usuario: req.usuarioId });
    res.status(201).json(presupuesto);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.obtenerTodos = async (req, res) => {
  try {
    const presupuestos = await Presupuesto.find({ usuario: req.usuarioId }).populate('categoria');
    res.json(presupuestos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.obtenerUno = async (req, res) => {
  try {
    const presupuesto = await Presupuesto.findOne({ _id: req.params.id, usuario: req.usuarioId }).populate('categoria');
    if (!presupuesto) return res.status(404).json({ mensaje: 'Presupuesto no encontrado' });
    res.json(presupuesto);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const presupuesto = await Presupuesto.findOneAndUpdate(
      { _id: req.params.id, usuario: req.usuarioId },
      req.body, { new: true }
    );
    if (!presupuesto) return res.status(404).json({ mensaje: 'Presupuesto no encontrado' });
    res.json(presupuesto);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    await Presupuesto.findOneAndDelete({ _id: req.params.id, usuario: req.usuarioId });
    res.json({ mensaje: 'Presupuesto eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};