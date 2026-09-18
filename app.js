const express = require('express');
const incidenciasRoutes = require('./routes/incidencias');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', incidenciasRoutes);

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});