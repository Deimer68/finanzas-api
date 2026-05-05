const Transaccion = require('../models/Transaccion');
const Categoria = require('../models/Categoria');

exports.guardarOnboarding = async (req, res) => {
  try {
    const { ingresos, gastos } = req.body;
    const usuarioId = req.usuarioId;

    for (const ingreso of ingresos) {
      let cat = await Categoria.findOne({ nombre: ingreso.nombre, usuario: usuarioId });

      if (!cat) {
        cat = await Categoria.create({
          nombre: ingreso.nombre,
          tipo: 'ingreso',
          usuario: usuarioId
        });
      }

      await Transaccion.create({
        tipo: 'ingreso',
        monto: ingreso.monto,
        descripcion: ingreso.descripcion || ingreso.nombre,
        categoria: cat._id,
        usuario: usuarioId,
        recurrente: ingreso.recurrente || false
      });
    }

    for (const gasto of gastos) {
      let cat = await Categoria.findOne({ nombre: gasto.nombre, usuario: usuarioId });

      if (!cat) {
        cat = await Categoria.create({
          nombre: gasto.nombre,
          tipo: 'gasto',
          usuario: usuarioId
        });
      }

      await Transaccion.create({
        tipo: 'gasto',
        monto: gasto.monto,
        descripcion: gasto.descripcion || gasto.nombre,
        categoria: cat._id,
        usuario: usuarioId,
        recurrente: gasto.recurrente || false
      });
    }

    res.status(201).json({ mensaje: 'Onboarding guardado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};