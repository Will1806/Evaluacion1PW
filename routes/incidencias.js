const express = require('express');
const router = express.Router();

const {
    crearIncidencia,
    listarIncidencias,
    obtenerIncidenciaPorId
} = require('../controllers/incidenciasController');

router.post('/incidencias', crearIncidencia);
router.get('/incidencias', listarIncidencias);
router.get('/incidencias/:id', obtenerIncidenciaPorId);

module.exports = router;