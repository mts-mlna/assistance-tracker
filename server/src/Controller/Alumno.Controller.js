const db = require('../database/DataBase');

const ListarAlumnos = (req, res) => {
  const sql = `SELECT Id, Nombre, Genero FROM Alumno ORDER BY Nombre`;
  db.all(sql, [], (err, filas) => {
    if (err) return res.status(500).json({ mensaje: "Error al listar alumnos" });
    res.status(200).json({ Alumnos: filas });
  });
};

const ListarAlumnosPorCurso = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT a.Id, a.Nombre, a.Genero
    FROM AlumnoClase ac
    INNER JOIN Alumno a ON ac.AlumnoId = a.Id
    WHERE ac.ClaseId = ?
    ORDER BY a.Nombre
  `;
  db.all(sql, [id], (err, filas) => {
    if (err) return res.status(500).json({ mensaje: "Error al listar alumnos del curso" });
    res.status(200).json({ Alumnos: filas });
  });
};

const AgregarAlumnoACurso = (req, res) => {
  const { id } = req.params;     // ClaseId
  const { alumnoId } = req.body; // AlumnoId

  if (!alumnoId) return res.status(400).json({ mensaje: "alumnoId es obligatorio" });

  const sql = `INSERT INTO AlumnoClase (AlumnoId, ClaseId) VALUES (?, ?)`;
  db.run(sql, [alumnoId, id], function (err) {
    if (err) {
      if (String(err.message).includes('UNIQUE')) {
        return res.status(409).json({ mensaje: "El alumno ya está inscripto en este curso" });
      }
      return res.status(500).json({ mensaje: "Error al agregar alumno al curso" });
    }
    res.status(201).json({ mensaje: "Alumno agregado al curso", Id: this.lastID });
  });
};

const EliminarAlumnoDeCurso = (req, res) => {
  const { id, alumnoId } = req.params;
  const sql = `DELETE FROM AlumnoClase WHERE ClaseId = ? AND AlumnoId = ?`;
  db.run(sql, [id, alumnoId], function (err) {
    if (err) return res.status(500).json({ mensaje: "Error al eliminar alumno del curso" });
    if (this.changes === 0) return res.status(404).json({ mensaje: "Alumno no encontrado en el curso" });
    res.status(200).json({ mensaje: "Alumno eliminado del curso" });
  });
};

module.exports = {
  ListarAlumnos,
  ListarAlumnosPorCurso,
  AgregarAlumnoACurso,
  EliminarAlumnoDeCurso
};
