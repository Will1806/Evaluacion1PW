    // Funciones reutilizables de validación

function esTextoValido(valor) {
    // Debe ser string y no quedar vacío luego de quitar espacios
    return typeof valor === 'string' && valor.trim().length > 0;
}

function esPrioridadValida(prioridad) {
    const prioridadNormalizada = prioridad.trim().toLowerCase();

    switch (prioridadNormalizada) {
        case 'alta':
        case 'media':
        case 'baja':
            return true;
        default:
            return false;
    }
}

module.exports = {
    esTextoValido,
    esPrioridadValida
};