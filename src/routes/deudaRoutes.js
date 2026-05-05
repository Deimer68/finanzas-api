const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/deudaController');
const auth = require('../middlewares/auth');

router.post('/', auth, ctrl.crear);
router.get('/', auth, ctrl.obtenerTodas);
router.get('/:id', auth, ctrl.obtenerUna);
router.get('/:id/calcular', auth, ctrl.calcular);
router.put('/:id', auth, ctrl.actualizar);
router.delete('/:id', auth, ctrl.eliminar);

module.exports = router;
