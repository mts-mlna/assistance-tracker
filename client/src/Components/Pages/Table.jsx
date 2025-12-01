import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Layouts.css';

function Table() {
  const { id } = useParams(); // ClaseId
  const [students, setStudents] = useState([]);
  const [cursoInfo, setCursoInfo] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [allAlumnos, setAllAlumnos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/api/asistencias/curso/${id}`);
      const data = await res.json();
      // Aseguramos que cada alumno tenga checked inicial en false
      const alumnosConCheck = (data.Alumnos || []).map(a => ({ ...a, checked: false }));
      setStudents(alumnosConCheck);
      setCursoInfo(data.Curso || null);
    };
    fetchData();
  }, [id]);

  const handleSortByName = () => {
    const sorted = [...students].sort((a, b) =>
      sortAsc ? a.Nombre.localeCompare(b.Nombre) : b.Nombre.localeCompare(a.Nombre)
    );
    setStudents(sorted);
    setSortAsc(!sortAsc);
  };

  const toggleSelect = (studentId) => {
    setStudents(prev =>
      prev.map(s => s.Id === studentId ? { ...s, checked: !s.checked } : s)
    );
  };

  const handleClickSP = () => {
    setConfirmAction("sp");
    setShowConfirm(true);
  };

  const handleClickDelete = () => {
    setConfirmAction("delete");
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    if (confirmAction === "sp") {
      // Aquí podrías llamar a un POST para registrar ausente en la fecha actual
      // por cada seleccionado. Por ahora, sólo log:
      const seleccionados = students.filter(s => s.checked).map(s => s.Id);
      console.log("Marcar como ausente:", seleccionados);
    }

    if (confirmAction === "delete") {
      const seleccionados = students.filter(s => s.checked);
      // DELETE en backend para cada alumno seleccionado
      await Promise.all(
        seleccionados.map(s =>
          fetch(`http://localhost:3000/api/curso/${id}/alumnos/${s.Id}`, { method: 'DELETE' })
        )
      );
      // Actualizamos UI removiendo seleccionados
      setStudents(prev => prev.filter(s => !s.checked));
    }

    setShowConfirm(false);
    setConfirmAction(null);
  };

  const handleClickAddAlumno = async () => {
    const res = await fetch("http://localhost:3000/api/alumnos");
    const data = await res.json();
    setAllAlumnos(data.Alumnos || []);
    setShowAddPopup(true);
  };

  const handleAddAlumnoToCurso = async (alumnoId) => {
    const res = await fetch(`http://localhost:3000/api/curso/${id}/alumnos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alumnoId })
    });
    if (res.ok) {
      // Refrescar alumnos del curso (puede venir por asistencias o por lista de curso)
      const r2 = await fetch(`http://localhost:3000/api/asistencias/curso/${id}`);
      const d2 = await r2.json();
      setStudents((d2.Alumnos || []).map(a => ({ ...a, checked: false })));
      setShowAddPopup(false);
    } else {
      const err = await res.json().catch(() => ({}));
      alert(err.mensaje || "No se pudo agregar el alumno");
    }
  };

  const filteredStudents = students.filter(s =>
    s.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className='dashboard-main'>
      <section className='my-class'>
        <div className='my-class-inner'>
          <h1>{cursoInfo?.NombreMateria || "Curso"}</h1>
          <div className='date-hour'>
            <p>Fecha: {new Date().toLocaleDateString()}</p>
            <p>Hora: {new Date().toLocaleTimeString()}</p>
          </div>
          <div className='date-hour'>
            <p>Curso: {cursoInfo?.Curso}</p>
            <p>Grupo: {cursoInfo?.GrupoTaller || "-"}</p>
          </div>
          <div className='date-hour'>
            <p>Cuatrimestre: {cursoInfo?.Cuatrimestre}</p>
          </div>
        </div>
      </section>

      <section className='search-center'>
        <div className='search-inner'>
          <div className='search'>
            <input
              type="text"
              placeholder='Escribir el nombre o apellido de un alumno...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>Buscar</button>
          </div>
          <div className='header-actions'>
            <button className='absent' onClick={handleClickSP}>Ausente</button>
            <button className='erase-selection' onClick={handleClickDelete}>Eliminar selección</button>
            <button className='save-changes' onClick={handleClickAddAlumno}>Agregar alumno</button>
          </div>
        </div>
      </section>

      <section className='table-center'>
        <div className='table-border'>
          <table className='professor-table-assistance'>
            <thead>
              <tr>
                <th></th>
                <th className='student-name-header'>
                  <button onClick={handleSortByName}>
                    <span>Estudiante</span>
                  </button>
                </th>
                <th>Género</th>
                <th>Asistencias</th>
                <th>Porcentaje</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.Id}>
                  <td>
                    <label className='professor-checkbox-wrapper'>
                      <input
                        type="checkbox"
                        checked={student.checked || false}
                        onChange={() => toggleSelect(student.Id)}
                      />
                      <span className='custom-checkbox'></span>
                    </label>
                  </td>
                  <td><span>{student.Nombre}</span></td>
                  <td>{student.Genero}</td>
                  <td>{student.Asistencias}/{student.TotalClases}</td>
                  <td>{student.Porcentaje}%</td>
                  <td className='table-actions'>
                    <button className='present' onClick={() => toggleSelect(student.Id)}>Presente</button>
                    <button className='options'>Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {showConfirm && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>¿Confirmar acción?</h2>
            <p>
              {confirmAction === "sp" && "Se marcarán como ausentes los alumnos seleccionados. ¿Estás seguro?"}
              {confirmAction === "delete" && "Se eliminarán los alumnos seleccionados del curso. ¿Estás seguro?"}
            </p>
            <div className="popup-buttons">
              <button onClick={handleConfirm} className='popup-confirm'>Confirmar</button>
              <button onClick={() => setShowConfirm(false)} className='popup-cancel'>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {showAddPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Agregar alumno al curso</h2>
            <div className='table-border'>
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Género</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {allAlumnos.map(alumno => (
                    <tr key={alumno.Id}>
                      <td>{alumno.Nombre}</td>
                      <td>{alumno.Genero}</td>
                      <td>
                        <button onClick={() => handleAddAlumnoToCurso(alumno.Id)}>+ Agregar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="popup-buttons">
              <button onClick={() => setShowAddPopup(false)} className='popup-cancel'>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Table;
