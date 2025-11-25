import React, { useState } from 'react'
import './Layouts.css'

function Layouts() {

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
  }

  return (
    <main className='dashboard-main'>
      <section className='my-class'>
        <div className='my-class-inner'>
          <h1>CS. NATURALES</h1>
          <div className='date-hour'>
            <p>Fecha: 7/7/2025</p>
            <p>Hora: 15:10</p>
          </div>
        </div>
      </section>
      <section className='search-center'>
        <div className='search-inner'>
          <div className='search'>
            <input type="text" name="" id="" placeholder='Escribir el nombre o apellido de un alumno...' />
            <button><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></button>
          </div>
          <div className='header-actions'>
            <button className='sp'>S/P</button>
            <button className='save-changes'>Guardar</button>
          </div>
        </div>
      </section>
      <section className='table-center'>
        <div className='table-border'>
          <table className='professor-table-assistance'>
            <thead>
              <tr>
                <th>
                  <label className='checkbox-wrapper'>
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
                <th>Curso</th>
                <th>Grupo</th>
                <th>Clase de hoy</th>
                <th>Asistencias</th>
                <th>Porcentaje</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
              <tr key={student.id}>
                <td>
                  <label className='checkbox-wrapper'>
                    <input type="checkbox" checked={student.checked} onChange={() => handleSelectOne(student.id)} />
                    <span className='custom-checkbox'></span>
                  </label>
                </td>
                <td><span>{student.nombre}</span></td>
                <td>{student.curso}</td>
                <td>{student.grupo}</td>
                <td>{student.asistencia}</td>
                <td>1/90</td>
                <td>75%</td>
                <td className='table-actions'>
                  <button className='present'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>Presente</button>
                  <button className='absent'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>Ausente</button>
                  <button className='options'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

export default Layouts
