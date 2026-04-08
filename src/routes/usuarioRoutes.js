const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/usuarioController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * /api/usuarios/registrar:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               password:
 *                 type: string
 *               moneda:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: El correo ya está registrado
 */
router.post('/registrar', ctrl.registrar);

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso, retorna token
 *       401:
 *         description: Contraseña incorrecta
 */
router.post('/login', ctrl.login);

/**
 * @swagger
 * /api/usuarios/perfil:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *       401:
 *         description: Token requerido
 */
router.get('/perfil', auth, ctrl.obtenerPerfil);

/**
 * @swagger
 * /api/usuarios/perfil:
 *   put:
 *     summary: Actualizar perfil del usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil actualizado
 */
router.put('/perfil', auth, ctrl.actualizarPerfil);

/**
 * @swagger
 * /api/usuarios/perfil:
 *   delete:
 *     summary: Eliminar cuenta del usuario
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario eliminado
 */
router.delete('/perfil', auth, ctrl.eliminarUsuario);

module.exports = router;