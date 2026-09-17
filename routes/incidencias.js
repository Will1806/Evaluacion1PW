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
router.put('/incidencias/:id/estado', cambiarEstadoIncidencia);
router.delete('/incidencias/:id', eliminarIncidencia);

module.exports = router;