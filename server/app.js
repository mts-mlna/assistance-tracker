// server/app.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const App = express();

// Middlewares
App.use(cors({
  origin: "http://localhost:5173", // o 127.0.0.1:5173 según tu frontend
  credentials: true
}));
App.use(express.json());

// Routers
const RutasClase = require('./src/Router/Class.Router');
const RutasLogin = require('./src/Router/Login.Router');
const alumnoRoutes = require('./src/Router/Alumno.Router');
const asistenciaRoutes = require('./src/Router/Asistencia.Router');

// Montaje bajo /api
App.use('/api', alumnoRoutes);
App.use('/api', RutasLogin);
App.use('/api', RutasClase);
App.use('/api', asistenciaRoutes);

// Healthcheck opcional
App.get('/api/health', (_req, res) => res.status(200).json({ ok: true }));

const PORT = process.env.PORT || 3000;
App.listen(PORT, () => {
  console.log(`🚀 http://localhost:${PORT}`);
});
