const mongoose = require('mongoose');

const inversionSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  tipo: { 
    type: String, 
    enum: ['acciones', 'etf', 'cripto', 'fondo_inversion', 'cdt', 'finca_raiz', 'startups', 'otro'],
    required: true 
  },
  nombre: { type: String, required: true },
  montoInvertido: { type: Number, required: true },
  rendimientoAnual: { type: Number, required: true },
  riesgo: { type: String, enum: ['bajo', 'medio', 'alto'], required: true },
  fechaInicio: { type: Date, required: true },
  descripcion: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Inversion', inversionSchema);
