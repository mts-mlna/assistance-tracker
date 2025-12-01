// server/src/Controller/Asistencia.Controller.js
const db = require('../database/DataBase');

const RegistrarAsistencia = (req, res) => {
  const { alumnoId, claseId, fecha, estado } = req.body;

  if (!alumnoId || !claseId || !fecha || !estado) {
    return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
  }

  const sql = `INSERT INTO Asistencia (AlumnoId, ClaseId, Fecha, Estado) VALUES (?, ?, ?, ?)`;
  db.run(sql, [alumnoId, claseId, fecha, estado], function (err) {
    if (err) return res.status(500).json({ mensaje: "Error al registrar asistencia" });
    res.status(201).json({ mensaje: "Asistencia registrada", Id: this.lastID });
  });
};

module.exports = { RegistrarAsistencia };
