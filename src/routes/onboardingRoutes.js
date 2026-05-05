const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/onboardingController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * /api/onboarding:
 *   post:
 *     summary: Guardar datos de onboarding (ingresos y gastos iniciales)
 *     tags: [Onboarding]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ingresos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                     monto:
 *                       type: number
 *                     descripcion:
 *                       type: string
 *                     recurrente:
 *                       type: boolean
 *               gastos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                     monto:
 *                       type: number
 *                     descripcion:
 *                       type: string
 *                     recurrente:
 *                       type: boolean
 *     responses:
 *       201:
 *         description: Onboarding guardado exitosamente
 *       500:
 *         description: Error del servidor
 */
router.post('/', auth, ctrl.guardarOnboarding);

module.exports = router;