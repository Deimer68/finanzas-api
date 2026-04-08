const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, enum: ['ingreso', 'gasto'], required: true },
  color: { type: String, default: '#000000' },
  icono: { type: String, default: 'default' },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Categoria', categoriaSchema);