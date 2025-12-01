const express = require('express');
const Rutas = express.Router();

const { CrearClase, ListarClases, ObtenerClase, EditarClase, EliminarClase, ListarClasesPorProfesor, ListarClasesConProfesor, ListarAsistenciasPorCurso } = require('../Controller/Class.Controller');

Rutas.post('/crear-clase', CrearClase);
// Rutas.get('/clases', ListarClases);
Rutas.get('/clases/:id', ObtenerClase);
Rutas.put('/editar-clase/:id', EditarClase);
Rutas.delete('/eliminar-clase/:id', EliminarClase);
Rutas.get('/clases/profesor/:profesorId', ListarClasesPorProfesor);
Rutas.get('/clases', ListarClasesConProfesor);
Rutas.get('/asistencias/curso/:id', ListarAsistenciasPorCurso);




module.exports = Rutas;
