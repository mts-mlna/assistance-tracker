// server/src/Router/Asistencia.Router.js
const express = require('express');
const Rutas = express.Router();
const { RegistrarAsistencia } = require('../Controller/Asistencia.Controller');

Rutas.post('/asistencias', RegistrarAsistencia);

module.exports = Rutas;
