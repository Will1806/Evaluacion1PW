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

module.exports = {
    crearIncidencia,
    listarIncidencias,
    obtenerIncidenciaPorId,
    incidencias
};

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