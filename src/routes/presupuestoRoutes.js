const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/presupuestoController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * /api/presupuestos:
 *   post:
 *     summary: Crear un presupuesto
 *     tags: [Presupuestos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               monto:
 *                 type: number
 *               mes:
 *                 type: number
 *               anio:
 *                 type: number
 *               categoria:
 *                 type: string
 *     responses:
 *       201:
 *         description: Presupuesto creado
 */
router.post('/', auth, ctrl.crear);

/**
 * @swagger
 * /api/presupuestos:
 *   get:
 *     summary: Obtener todos los presupuestos
 *     tags: [Presupuestos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de presupuestos
 */
router.get('/', auth, ctrl.obtenerTodos);

/**
 * @swagger
 * /api/presupuestos/{id}:
 *   get:
 *     summary: Obtener un presupuesto por ID
 *     tags: [Presupuestos]
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
 *         description: Presupuesto encontrado
 */
router.get('/:id', auth, ctrl.obtenerUno);

/**
 * @swagger
 * /api/presupuestos/{id}:
 *   put:
 *     summary: Actualizar un presupuesto
 *     tags: [Presupuestos]
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
 *         description: Presupuesto actualizado
 */
router.put('/:id', auth, ctrl.actualizar);

/**
 * @swagger
 * /api/presupuestos/{id}:
 *   delete:
 *     summary: Eliminar un presupuesto
 *     tags: [Presupuestos]
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
 *         description: Presupuesto eliminado
 */
router.delete('/:id', auth, ctrl.eliminar);

module.exports = router;