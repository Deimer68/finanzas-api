const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/inversionController');
const auth = require('../middlewares/auth');

router.post('/', auth, ctrl.crear);
router.get('/', auth, ctrl.obtenerTodas);
router.get('/:id', auth, ctrl.obtenerUna);
router.get('/:id/proyeccion', auth, ctrl.proyeccion);
router.put('/:id', auth, ctrl.actualizar);
router.delete('/:id', auth, ctrl.eliminar);

module.exports = router;
