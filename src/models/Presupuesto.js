const mongoose = require('mongoose');

const presupuestoSchema = new mongoose.Schema({
  monto: { type: Number, required: true },
  mes: { type: Number, required: true },
  anio: { type: Number, required: true },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Presupuesto', presupuestoSchema);