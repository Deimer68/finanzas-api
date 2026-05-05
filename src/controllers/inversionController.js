const Inversion = require('../models/Inversion');

exports.crear = async (req, res) => {
  try {
    const inversion = await Inversion.create({ ...req.body, usuario: req.usuarioId });
    res.status(201).json(inversion);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.obtenerTodas = async (req, res) => {
  try {
    const inversiones = await Inversion.find({ usuario: req.usuarioId });
    const resumen = inversiones.reduce((acc, inv) => {
      const rendimientoAnual = inv.montoInvertido * (inv.rendimientoAnual / 100);
      return {
        totalInvertido: acc.totalInvertido + inv.montoInvertido,
        rendimientoAnualTotal: acc.rendimientoAnualTotal + rendimientoAnual,
      };
    }, { totalInvertido: 0, rendimientoAnualTotal: 0 });
    res.json({ inversiones, resumen });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.obtenerUna = async (req, res) => {
  try {
    const inversion = await Inversion.findOne({ _id: req.params.id, usuario: req.usuarioId });
    if (!inversion) return res.status(404).json({ mensaje: 'Inversión no encontrada' });
    res.json(inversion);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.actualizar = async (req, res) => {
  try {
    const inversion = await Inversion.findOneAndUpdate(
      { _id: req.params.id, usuario: req.usuarioId },
      req.body, { new: true }
    );
    res.json(inversion);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.eliminar = async (req, res) => {
  try {
    await Inversion.findOneAndDelete({ _id: req.params.id, usuario: req.usuarioId });
    res.json({ mensaje: 'Inversión eliminada' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.proyeccion = async (req, res) => {
  try {
    const inversion = await Inversion.findOne({ _id: req.params.id, usuario: req.usuarioId });
    if (!inversion) return res.status(404).json({ mensaje: 'Inversión no encontrada' });

    const { montoInvertido, rendimientoAnual } = inversion;
    const tasa = rendimientoAnual / 100;

    const proyeccion = [1, 2, 3, 5, 10].map(años => ({
      años,
      valorSimple: montoInvertido + (montoInvertido * tasa * años),
      valorCompuesto: montoInvertido * Math.pow(1 + tasa, años),
      ganancia: (montoInvertido * Math.pow(1 + tasa, años)) - montoInvertido
    }));

    res.json({ inversion, proyeccion });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};
