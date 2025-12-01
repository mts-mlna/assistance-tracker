const express = require('express');
const Rutas = express.Router();
const {
  ListarAlumnos,
  ListarAlumnosPorCurso,
  AgregarAlumnoACurso,
  EliminarAlumnoDeCurso
} = require('../Controller/Alumno.Controller');

// Alumnos generales
Rutas.get('/alumnos', ListarAlumnos);

// Alumnos por curso
Rutas.get('/curso/:id/alumnos', ListarAlumnosPorCurso);
Rutas.post('/curso/:id/alumnos', AgregarAlumnoACurso);
Rutas.delete('/curso/:id/alumnos/:alumnoId', EliminarAlumnoDeCurso);

module.exports = Rutas;
