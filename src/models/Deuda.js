const mongoose = require('mongoose');

const deudaSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  banco: { type: String, required: true },
  tipo: { type: String, enum: ['libre_inversion', 'vehicular', 'hipotecario', 'tarjeta_credito', 'educativo', 'otro'], required: true },
  montoOriginal: { type: Number, required: true },
  saldoPendiente: { type: Number, required: true },
  tasaInteres: { type: Number, required: true },
  cuotaMensual: { type: Number, required: true },
  plazoMeses: { type: Number, required: true },
  mesesPagados: { type: Number, default: 0 },
  fechaInicio: { type: Date, required: true },
  descripcion: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Deuda', deudaSchema);
