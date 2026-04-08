const mongoose = require('mongoose');

const transaccionSchema = new mongoose.Schema({
  tipo: { type: String, enum: ['ingreso', 'gasto'], required: true },
  monto: { type: Number, required: true },
  descripcion: { type: String },
  fecha: { type: Date, default: Date.now },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  recurrente: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Transaccion', transaccionSchema);