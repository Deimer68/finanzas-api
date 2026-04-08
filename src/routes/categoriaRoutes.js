const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/categoriaController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * /api/categorias:
 *   post:
 *     summary: Crear una categoría
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 enum: [ingreso, gasto]
 *               color:
 *                 type: string
 *               icono:
 *                 type: string
 *     responses:
 *       201:
 *         description: Categoría creada
 */
router.post('/', auth, ctrl.crear);

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorías
 */
router.get('/', auth, ctrl.obtenerTodas);

/**
 * @swagger
 * /api/categorias/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *       404:
 *         description: Categoría no encontrada
 */
router.get('/:id', auth, ctrl.obtenerUna);

/**
 * @swagger
 * /api/categorias/{id}:
 *   put:
 *     summary: Actualizar una categoría
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría actualizada
 */
router.put('/:id', auth, ctrl.actualizar);

/**
 * @swagger
 * /api/categorias/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [Categorías]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Categoría eliminada
 */
router.delete('/:id', auth, ctrl.eliminar);

module.exports = router;