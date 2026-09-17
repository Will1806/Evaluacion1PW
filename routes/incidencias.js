const express = require('express');
const router = express.Router();

const {
    crearIncidencia,
    listarIncidencias,
    obtenerIncidenciaPorId,
    cambiarEstadoIncidencia,
    eliminarIncidencia,
    obtenerEstadisticas,
    obtenerClasificacion
} = require('../controllers/incidenciasController');

router.post('/incidencias', crearIncidencia);
router.get('/incidencias', listarIncidencias);
router.get('/incidencias/:id/clasificacion', obtenerClasificacion);
router.get('/incidencias/:id', obtenerIncidenciaPorId);
router.put('/incidencias/:id/estado', cambiarEstadoIncidencia);
router.delete('/incidencias/:id', eliminarIncidencia);

router.get('/estadisticas', obtenerEstadisticas);

module.exports = router;