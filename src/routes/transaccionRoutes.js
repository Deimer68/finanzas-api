const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/transaccionController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * /api/transacciones:
 *   post:
 *     summary: Crear una transacción
 *     tags: [Transacciones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 enum: [ingreso, gasto]
 *               monto:
 *                 type: number
 *               descripcion:
 *                 type: string
 *               categoria:
 *                 type: string
 *               recurrente:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Transacción creada
 */
router.post('/', auth, ctrl.crear);

/**
 * @swagger
 * /api/transacciones:
 *   get:
 *     summary: Obtener todas las transacciones
 *     tags: [Transacciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *       - in: query
 *         name: desde
 *         schema:
 *           type: string
 *       - in: query
 *         name: hasta
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de transacciones
 */
router.get('/', auth, ctrl.obtenerTodas);

/**
 * @swagger
 * /api/transacciones/resumen:
 *   get:
 *     summary: Obtener resumen de ingresos, gastos y saldo
 *     tags: [Transacciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resumen financiero
 */
router.get('/resumen', auth, ctrl.resumen);

/**
 * @swagger
 * /api/transacciones/{id}:
 *   get:
 *     summary: Obtener una transacción por ID
 *     tags: [Transacciones]
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
 *         description: Transacción encontrada
 */
router.get('/:id', auth, ctrl.obtenerUna);

/**
 * @swagger
 * /api/transacciones/{id}:
 *   put:
 *     summary: Actualizar una transacción
 *     tags: [Transacciones]
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
 *         description: Transacción actualizada
 */
router.put('/:id', auth, ctrl.actualizar);

/**
 * @swagger
 * /api/transacciones/{id}:
 *   delete:
 *     summary: Eliminar una transacción
 *     tags: [Transacciones]
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
 *         description: Transacción eliminada
 */
router.delete('/:id', auth, ctrl.eliminar);

module.exports = router;