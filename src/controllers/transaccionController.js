const Transaccion = require('../models/Transaccion');

exports.crear = async (req, res) => {
  try {
    const transaccion = await Transaccion.create({ ...req.body, usuario: req.usuarioId });
    res.status(201).json(transaccion);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.obtenerTodas = async (req, res) => {
  try {
    const { tipo, categoria, desde, hasta } = req.query;
    const filtro = { usuario: req.usuarioId };
    if (tipo) filtro.tipo = tipo;
    if (categoria) filtro.categoria = categoria;
    if (desde || hasta) {
      filtro.fecha = {};
      if (desde) filtro.fecha.$gte = new Date(desde);
      if (hasta) filtro.fecha.$lte = new Date(hasta);
    }
    const transacciones = await Transaccion.find(filtro).populate('categoria').sort({ fecha: -1 });
    res.json(transacciones);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.obtenerUna = async (req, res) => {
  try {
    const transaccion = await Transaccion.findOne({ _id: req.params.id, usuario: req.usuarioId }).populate('categoria');
    if (!transaccion) return res.status(404).json({ mensaje: 'Transacción no encontrada' });
    res.json(transaccion);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const transaccion = await Transaccion.findOneAndUpdate(
      { _id: req.params.id, usuario: req.usuarioId },
      req.body, { new: true }
    );
    if (!transaccion) return res.status(404).json({ mensaje: 'Transacción no encontrada' });
    res.json(transaccion);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    await Transaccion.findOneAndDelete({ _id: req.params.id, usuario: req.usuarioId });
    res.json({ mensaje: 'Transacción eliminada' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.resumen = async (req, res) => {
  try {
    const transacciones = await Transaccion.find({ usuario: req.usuarioId });
    const ingresos = transacciones.filter(t => t.tipo === 'ingreso').reduce((s, t) => s + t.monto, 0);
    const gastos = transacciones.filter(t => t.tipo === 'gasto').reduce((s, t) => s + t.monto, 0);
    res.json({ ingresos, gastos, saldo: ingresos - gastos });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};