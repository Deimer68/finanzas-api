const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
  try {
    const { nombre, correo, password, moneda } = req.body;
    const existe = await Usuario.findOne({ correo });
    if (existe) return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    const hash = await bcrypt.hash(password, 10);
    const usuario = await Usuario.create({ nombre, correo, password: hash, moneda });
    res.status(201).json({ mensaje: 'Usuario creado', usuario });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, usuario });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.obtenerPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuarioId).select('-password');
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.actualizarPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.usuarioId, req.body, { new: true }).select('-password');
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.usuarioId);
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};