const { esTextoValido, esPrioridadValida } = require('../utils/helpers');

// "Base de datos" en memoria
const incidencias = [];
let siguienteId = 1;

// 2. Registrar incidencia
function crearIncidencia(req, res) {
    const { empleado, area, descripcion, prioridad } = req.body;

    if (
        !esTextoValido(empleado) ||
        !esTextoValido(area) ||
        !esTextoValido(descripcion) ||
        !esTextoValido(prioridad)
    ) {
        return res.status(400).json({
            mensaje: 'Todos los campos son obligatorios y no pueden estar vacíos'
        });
    }

    if (!esPrioridadValida(prioridad)) {
        return res.status(400).json({
            mensaje: 'La prioridad solo puede ser "Alta", "Media" o "Baja"'
        });
    }

    const nuevaIncidencia = {
        id: siguienteId,
        empleado: empleado.trim(),
        area: area.trim(),
        descripcion: descripcion.trim(),
        prioridad: prioridad.trim(),
        estado: 'Pendiente'
    };

    incidencias.push(nuevaIncidencia);
    siguienteId++;

    res.status(201).json({ mensaje: 'Incidencia registrada correctamente' });
}

// 3. Listar incidencias
function listarIncidencias(req, res) {
    res.json(incidencias);
}

// 4. Buscar incidencia por ID
function obtenerIncidenciaPorId(req, res) {
    const id = Number(req.params.id);
    const incidencia = incidencias.find((incidencia) => incidencia.id === id);

    if (!incidencia) {
        return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
    }

    res.json(incidencia);
}

// 5. Cambiar estado de incidencia (obligatorio usar switch)
function cambiarEstadoIncidencia(req, res) {
    const id = Number(req.params.id);
    const { estado } = req.body;

    const incidencia = incidencias.find((incidencia) => incidencia.id === id);

    if (!incidencia) {
        return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
    }

    let estadoValido;

    switch (estado) {
        case 'Pendiente':
        case 'En Proceso':
        case 'Resuelta':
        case 'Cancelada':
            estadoValido = true;
            break;
        default:
            estadoValido = false;
    }

    if (!estadoValido) {
        return res.status(400).json({ mensaje: 'El estado ingresado no es válido' });
    }

    incidencia.estado = estado;

    res.json(incidencia);
}

// 6. Eliminar incidencia
function eliminarIncidencia(req, res) {
    const id = Number(req.params.id);
    const indice = incidencias.findIndex((incidencia) => incidencia.id === id);

    if (indice === -1) {
        return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
    }

    incidencias.splice(indice, 1);

    res.json({ mensaje: 'Incidencia eliminada correctamente' });
}

// 7. Endpoint de estadísticas (sin variables manuales, solo métodos de arreglo)
function obtenerEstadisticas(req, res) {
    res.json({
        totalIncidencias: incidencias.length,
        pendientes: incidencias.filter((incidencia) => incidencia.estado === 'Pendiente').length,
        enProceso: incidencias.filter((incidencia) => incidencia.estado === 'En Proceso').length,
        resueltas: incidencias.filter((incidencia) => incidencia.estado === 'Resuelta').length,
        canceladas: incidencias.filter((incidencia) => incidencia.estado === 'Cancelada').length
    });
}

// 8. Clasificación automática (obligatorio usar exclusivamente switch)
function obtenerClasificacion(req, res) {
    const id = Number(req.params.id);
    const incidencia = incidencias.find((incidencia) => incidencia.id === id);

    if (!incidencia) {
        return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
    }

    let clasificacion;

    switch (incidencia.prioridad) {
        case 'Alta':
            clasificacion = 'Crítica';
            break;
        case 'Media':
            clasificacion = 'Importante';
            break;
        case 'Baja':
            clasificacion = 'Normal';
            break;
        default:
            clasificacion = 'Sin clasificar';
    }

    res.json({ id: incidencia.id, clasificacion: clasificacion });
}

module.exports = {
    crearIncidencia,
    listarIncidencias,
    obtenerIncidenciaPorId,
    cambiarEstadoIncidencia,
    eliminarIncidencia,
    obtenerEstadisticas,
    obtenerClasificacion
};