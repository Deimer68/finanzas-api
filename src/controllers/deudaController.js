const Deuda = require('../models/Deuda');

exports.crear = async (req, res) => {
  try {
    const deuda = await Deuda.create({ ...req.body, usuario: req.usuarioId });
    res.status(201).json(deuda);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.obtenerTodas = async (req, res) => {
  try {
    const deudas = await Deuda.find({ usuario: req.usuarioId });
    const resumen = deudas.reduce((acc, d) => ({
      totalDeuda: acc.totalDeuda + d.saldoPendiente,
      totalCuotas: acc.totalCuotas + d.cuotaMensual,
      totalPagado: acc.totalPagado + (d.cuotaMensual * d.mesesPagados),
    }), { totalDeuda: 0, totalCuotas: 0, totalPagado: 0 });
    res.json({ deudas, resumen });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.obtenerUna = async (req, res) => {
  try {
    const deuda = await Deuda.findOne({ _id: req.params.id, usuario: req.usuarioId });
    if (!deuda) return res.status(404).json({ mensaje: 'Deuda no encontrada' });
    res.json(deuda);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const deuda = await Deuda.findOneAndUpdate(
      { _id: req.params.id, usuario: req.usuarioId },
      req.body, { new: true }
    );
    res.json(deuda);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    await Deuda.findOneAndDelete({ _id: req.params.id, usuario: req.usuarioId });
    res.json({ mensaje: 'Deuda eliminada' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.calcular = async (req, res) => {
  try {
    const deuda = await Deuda.findOne({ _id: req.params.id, usuario: req.usuarioId });
    if (!deuda) return res.status(404).json({ mensaje: 'Deuda no encontrada' });
    
    const mesesRestantes = deuda.plazoMeses - deuda.mesesPagados;
    const totalPagado = deuda.cuotaMensual * deuda.mesesPagados;
    const totalAPagar = deuda.cuotaMensual * deuda.plazoMeses;
    const interesesTotales = totalAPagar - deuda.montoOriginal;
    const interesesPagados = totalPagado - (deuda.montoOriginal * (deuda.mesesPagados / deuda.plazoMeses));
    
    res.json({
      mesesRestantes,
      totalPagado,
      totalAPagar,
      interesesTotales,
      interesesPagados,
      saldoPendiente: deuda.saldoPendiente,
      porcentajePagado: Math.round((deuda.mesesPagados / deuda.plazoMeses) * 100)
    });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};
