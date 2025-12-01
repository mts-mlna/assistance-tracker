const db = require('../database/DataBase');


const CrearClase = (req, res) => {
  const { NombreMateria, Curso, GrupoTaller, CantidadClases, Cuatrimestre, ProfesorId } = req.body;

  if (!NombreMateria || !Curso || !CantidadClases || !Cuatrimestre || !ProfesorId) {
    return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
  }

  if (!Number.isInteger(CantidadClases) || CantidadClases <= 0) {
    return res.status(400).json({ mensaje: "La cantidad de clases debe ser un número entero positivo" });
  }

  const cuatrimestresValidos = ["Primero", "Segundo"];
  if (!cuatrimestresValidos.includes(Cuatrimestre)) {
    return res.status(400).json({ mensaje: "El cuatrimestre debe ser 'Primero' o 'Segundo'" });
  }

  const BuscarUsuario = `SELECT * FROM Usuario WHERE Id = ? AND Rol = 'Profesor' AND Verificado = 1`;

  db.get(BuscarUsuario, [ProfesorId], (err, usuario) => {
    if (err) return res.status(500).json({ mensaje: "Error del servidor" });
    if (!usuario) return res.status(403).json({ mensaje: "Solo los profesores verificados pueden crear clases" });

    const InsertarClase = `
      INSERT INTO Clase (NombreMateria, Curso, GrupoTaller, CantidadClases, Cuatrimestre, ProfesorId)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(InsertarClase, [NombreMateria, Curso, GrupoTaller || null, CantidadClases, Cuatrimestre, ProfesorId], function (err2) {
      if (err2) return res.status(500).json({ mensaje: "Error al crear la clase" });

      return res.status(201).json({ mensaje: "Clase creada con éxito", ClaseId: this.lastID });
    });
  });
};

const ListarClases = (req, res) => {
  const sql = `SELECT * FROM Clase`;

  db.all(sql, [], (err, filas) => {
    if (err) return res.status(500).json({ mensaje: "Error al listar clases" });
    res.status(200).json({ Clases: filas });
  });
};

const ObtenerClase = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM Clase WHERE Id = ?`;

  db.get(sql, [id], (err, fila) => {
    if (err) return res.status(500).json({ mensaje: "Error del servidor" });
    if (!fila) return res.status(404).json({ mensaje: "Clase no encontrada" });
    res.status(200).json({ Clase: fila });
  });
};

const EditarClase = (req, res) => {
  const { id } = req.params;
  const { NombreMateria, Curso, GrupoTaller, CantidadClases, Cuatrimestre } = req.body;

  if (!NombreMateria || !Curso || !CantidadClases || !Cuatrimestre) {
    return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
  }

  const sql = `
    UPDATE Clase
    SET NombreMateria = ?, Curso = ?, GrupoTaller = ?, CantidadClases = ?, Cuatrimestre = ?
    WHERE Id = ?
  `;

  db.run(sql, [NombreMateria, Curso, GrupoTaller || null, CantidadClases, Cuatrimestre, id], function (err) {
    if (err) return res.status(500).json({ mensaje: "Error al editar clase" });
    if (this.changes === 0) return res.status(404).json({ mensaje: "Clase no encontrada" });

    res.status(200).json({ mensaje: "Clase editada con éxito" });
  });
};

// Eliminar clase
const EliminarClase = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM Clase WHERE Id = ?`;

  db.run(sql, [id], function (err) {
    if (err) return res.status(500).json({ mensaje: "Error al eliminar clase" });
    if (this.changes === 0) return res.status(404).json({ mensaje: "Clase no encontrada" });

    res.status(200).json({ mensaje: "Clase eliminada con éxito" });
  });
};

const ListarClasesPorProfesor = (req, res) => {
  const { profesorId } = req.params;
  const sql = `SELECT * FROM Clase WHERE ProfesorId = ?`;

  db.all(sql, [profesorId], (err, filas) => {
    if (err) return res.status(500).json({ mensaje: "Error al listar clases" });
    res.status(200).json({ Clases: filas });
  });
};

const ListarClasesConProfesor = (req, res) => {
  const sql = `
    SELECT Clase.*, Usuario.Nombre AS ProfesorNombre
    FROM Clase
    INNER JOIN Usuario ON Clase.ProfesorId = Usuario.Id
  `;
  db.all(sql, [], (err, filas) => {
    if (err) return res.status(500).json({ mensaje: "Error al listar clases" });
    res.status(200).json({ Clases: filas });
  });
};

const ListarAsistenciasPorCurso = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT 
      Alumno.Id,
      Alumno.Nombre,
      Alumno.Genero,
      COUNT(CASE WHEN Asistencia.Estado = 'Presente' THEN 1 END) AS Asistencias,
      COUNT(*) AS TotalClases,
      ROUND(100.0 * COUNT(CASE WHEN Asistencia.Estado = 'Presente' THEN 1 END) / COUNT(*), 2) AS Porcentaje,
      Clase.NombreMateria,
      Clase.Curso,
      Clase.GrupoTaller,
      Clase.Cuatrimestre
    FROM Asistencia
    INNER JOIN Alumno ON Asistencia.AlumnoId = Alumno.Id
    INNER JOIN Clase ON Asistencia.ClaseId = Clase.Id
    WHERE Clase.Id = ?
    GROUP BY Alumno.Id
  `;

  db.all(sql, [id], (err, filas) => {
    if (err) {
      return res.status(500).json({ mensaje: "Error al listar asistencias" });
    }

    if (filas.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron asistencias para este curso" });
    }

    // armamos respuesta con info del curso y alumnos
    const cursoInfo = {
      NombreMateria: filas[0].NombreMateria,
      Curso: filas[0].Curso,
      GrupoTaller: filas[0].GrupoTaller,
      Cuatrimestre: filas[0].Cuatrimestre
    };

    res.status(200).json({
      Curso: cursoInfo,
      Alumnos: filas
    });
  });
};


module.exports = { CrearClase, ListarClases, 
    ObtenerClase, EditarClase, EliminarClase, 
    ListarClasesPorProfesor, ListarClasesConProfesor, 
    ListarAsistenciasPorCurso };
