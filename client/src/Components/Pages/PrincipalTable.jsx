import React, { useState } from 'react'
import '../Layouts.css'
import { Link } from 'react-router-dom'

function PrincipalTable() {

  const [students, setStudents] = useState([
    {
      id: 1,
      nombre: "Sánchez, Bruno Ezequiel",
      curso: "7º2ª",
      grupo: "7.4",
      asistencia: "Ausente",
      checked: false
    },
    {
      id: 2,
      nombre: "Mánchez, Bruno Ezequiel",
      curso: "7º4ª",
      grupo: "7.4",
      asistencia: "Ausente",
      checked: false
    },
    {
      id: 3,
      nombre: "Hánchez, Bruno Ezequiel",
      curso: "7º4ª",
      grupo: "7.4",
      asistencia: "Ausente",
      checked: false
    },
    {
      id: 4,
      nombre: "Gánchez, Bruno Ezequiel",
      curso: "7º4ª",
      grupo: "7.4",
      asistencia: "Ausente",
      checked: false
    },
    {
      id: 5,
      nombre: "Fánchez, Bruno Ezequiel",
      curso: "7º4ª",
      grupo: "7.4",
      asistencia: "Ausente",
      checked: false
    },
    {
      id: 6,
      nombre: "Dánchez, Bruno Ezequiel",
      curso: "7º4ª",
      grupo: "7.4",
      asistencia: "Ausente",
      checked: false
    },
    {
      id: 7,
      nombre: "Cánchez, Bruno Ezequiel",
      curso: "7º4ª",
      grupo: "7.4",
      asistencia: "Ausente",
      checked: false
    },
    {
      id: 8,
      nombre: "Bánchez, Bruno Ezequiel",
      curso: "7º4ª",
      grupo: "7.4",
      asistencia: "Ausente",
      checked: false
    },
    {
      id: 9,
      nombre: "Ránchez, Bruno Ezequiel",
      curso: "7º4ª",
      grupo: "7.4",
      asistencia: "Ausente",
      checked: false
    }
  ]);

  const allChecked = students.every(s => s.checked);

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setStudents(students.map(s => ({ ...s, checked})));
  };

  const handleSelectOne = (id) => {
    setStudents(students.map(s =>
      s.id === id ? {...s, checked: !s.checked } : s
    ));
  };

  const [sortAsc, setSorcAsc] = useState(true);

  const handleSortByName = () => {
    const sorted = [...students].sort((a, b) => {
      if (sortAsc){
        return a.nombre.localeCompare(b.nombre);
      } else {
        return b.nombre.localeCompare(a.nombre);
      }
    });

    setStudents(sorted);
    setSorcAsc(!sortAsc);
  };

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const handleClickSave = () => {
    setConfirmAction("guardar")
    setShowConfirm(true)
  }

  const handleClickSP = () => {
    setConfirmAction("sp")
    setShowConfirm(true)
  }

  const handleConfirm = () => {
    if (confirmAction === "guardar") {
      console.log("Se guardaron los cambios")
    }

    if (confirmAction === "sp") {
      console.log("Acción S/P ejecutada")
    }

    setShowConfirm(false)
    setConfirmAction(null)
  }


  return (
    <main className='principal-dashboard-main'>
      <section className='search-center'>
        <div className='principal-search-inner'>
          <div className='search'>
            <input type="text" name="" id="" placeholder='Filtrar estudiantes...' />
            <button><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></button>
          </div>
          <div className='header-actions'>
            <button className='add-student'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>Agregar alumno</button>
            <button className='delete-student'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>Eliminar seleccionado</button>
          </div>
        </div>
      </section>
      <section className='table-center'>
        <div className='principal-table-border'>
          <table className='principal-table'>
            <thead>
              <tr>
                <th>
                  <label className='principal-checkbox-wrapper'>
                    <input type="checkbox" checked={allChecked} onChange={handleSelectAll} />
                    <span className='custom-checkbox'></span>
                  </label>
                </th>
                <th className='student-name-header'>
                  <button onClick={handleSortByName}>
                    <span>Estudiante</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-down"><path d="m21 16-4 4-4-4"></path><path d="M17 20V4"></path><path d="m3 8 4-4 4 4"></path><path d="M7 4v16"></path></svg>  
                  </button>
                </th>
                <th>DNI</th>
                <th>E-Mail</th>
                <th>Núm. Tel.</th>
                <th>Direcc.</th>
                <th>Fecha Nac.</th>
                <th>Género</th>
                <th>Curso</th>
                <th>Grupo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
              <tr key={student.id}>
                <td>
                  <label className='principal-checkbox-wrapper'>
                    <input type="checkbox" checked={student.checked} onChange={() => handleSelectOne(student.id)} />
                    <span className='custom-checkbox'></span>
                  </label>
                </td>
                <td><Link><span className='table-row-name-surname'>{student.nombre}</span></Link></td>
                <td>47.517.813</td>
                <td><span className='table-row-email'>matiasezequielmolina2006@gmail.com</span></td>
                <td><span className='table-row-phone'>+11 3045-7715</span></td>
                <td className='table-row-address'>P. Reta 2930</td>
                <td>05/10/2006</td>
                <td>M</td>
                <td>{student.curso}</td>
                <td>{student.grupo}</td>
                <td className='table-actions-principal'>
                  <button className='options'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>Modificar</button>
                  <button className='absent'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>Eliminar</button>
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
            {confirmAction === "guardar" && "Al confirmar esta acción se guardarán las asistecias e inasistencias. ¿Estás seguro?"}
            {confirmAction === "sp" && "Al confirmar esta acción se te marcará como ausente. Esta clase será eliminada del total de clases del cuatrimestre (pasarán a ser 32 en vez de 33). ¿Quieres continuar?"}
          </p>

          <div className="popup-buttons">
            <button onClick={handleConfirm} className='popup-confirm'>Confirmar</button>
            <button onClick={() => setShowConfirm(false)} className='popup-cancel'>Cancelar</button>
          </div>
        </div>
      </div>
      )}

    </main>
  )
}

export default PrincipalTable
