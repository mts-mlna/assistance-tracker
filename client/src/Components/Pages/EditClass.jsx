import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EditClass() {
  const { id } = useParams();

  const [nombreMateria, setNombreMateria] = useState("");
  const [cantidadClases, setCantidadClases] = useState("");
  const [cuatrimestre, setCuatrimestre] = useState("");

  const [courseOValue, setCourseOValue] = useState("");
  const [courseAValue, setCourseAValue] = useState("");
  const [labSelectValue, setLabSelectValue] = useState("");
  const [labInputValue, setLabInputValue] = useState("");
  const [labValue, setLabValue] = useState("");
  const [noAplica, setNoAplica] = useState(false);

  // --- Restricciones de curso ---
  const restricciones = {
    "1": ["1", "2", "3", "4", "6"],
    "2": ["1", "2", "3", "4", "6"],
    "3": ["1", "2", "3", "4", "6"],
    "4": ["1", "2", "3", "4"],
    "5": ["1", "2", "3", "4"],
    "6": ["1", "3"],
    "7": ["1", "2"],
  };

  const opcionesA = ["1", "2", "3", "4", "6"];
  const opcionesFiltradasA = courseOValue ? restricciones[courseOValue] : opcionesA;

  if (courseAValue && courseOValue && !opcionesFiltradasA.includes(courseAValue)) {
    setCourseAValue("");
  }

  // --- Reglas de grupo de taller ---
  const labRules = {
    "1-1": ["2", "4"], "1-2": ["1", "3"], "1-3": ["6", "8"], "1-4": ["5", "7"], "1-6": ["9", "11"],
    "2-1": ["2", "4"], "2-2": ["1", "3"], "2-3": ["6", "8"], "2-4": ["5", "7"], "2-6": ["9", "11"],
    "3-1": ["2", "4"], "3-2": ["1", "3"], "3-3": ["6", "8"], "3-4": ["5", "7"], "3-6": ["9", "11"],
    "4-1": ["2", "8"], "4-2": ["1", "3"], "4-3": ["4", "6"], "4-4": ["5", "7"],
    "5-1": ["4", "8"], "5-2": ["1", "3"], "5-3": ["2", "6"], "5-4": ["5", "7"],
    "6-1": ["2", "6"], "6-3": ["4", "8"],
    "7-1": ["1", "3"], "7-2": ["2", "4"],
  };

  const labKey = `${courseOValue}-${courseAValue}`;
  const labOptions = labRules[labKey] || [];

  if (labValue && !labOptions.includes(labValue)) {
    setLabValue("");
  }

  const handleNoAplicaChange = () => {
    setNoAplica(prev => {
      const newValue = !prev;
      if (newValue) {
        setLabInputValue("");
        setLabValue("");
        setLabSelectValue("");
      }
      return newValue;
    });
  };

  useEffect(() => {
    if (!noAplica) {
      setLabInputValue(courseOValue);
    }
  }, [courseOValue, noAplica]);

  useEffect(() => {
    if (noAplica) {
      setLabSelectValue("");
    }
  }, [noAplica]);

  // --- Precargar datos desde el backend ---
  useEffect(() => {
    const fetchClase = async () => {
      const res = await fetch(`http://localhost:3000/api/clases/${id}`);
      const data = await res.json();
      const clase = data.Clase;

      setNombreMateria(clase.NombreMateria);
      setCantidadClases(clase.CantidadClases);
      setCuatrimestre(clase.Cuatrimestre);

      // Parsear curso (ej: "3°2a")
      if (clase.Curso) {
        const match = clase.Curso.match(/^(\d+)°(\d+)a$/);
        if (match) {
          setCourseOValue(match[1]);
          setCourseAValue(match[2]);
        }
      }

      // Grupo de taller
      if (clase.GrupoTaller) {
        const parts = clase.GrupoTaller.split(" - ");
        if (parts.length === 2) {
          setLabInputValue(parts[0].split("°")[0]); // ej: "3"
          setLabSelectValue(parts[1]);              // ej: "6"
        }
      } else {
        setNoAplica(true);
      }
    };
    fetchClase();
  }, [id]);

  // --- Enviar cambios ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const curso = `${courseOValue}°${courseAValue}a`;
    const grupoTaller = noAplica ? null : `${courseOValue}°${courseAValue} - ${labSelectValue}`;

    const res = await fetch(`http://localhost:3000/api/editar-clase/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        NombreMateria: nombreMateria,
        Curso: curso,
        GrupoTaller: grupoTaller,
        CantidadClases: parseInt(cantidadClases),
        Cuatrimestre: cuatrimestre
      })
    });

    const data = await res.json();
    alert(data.mensaje || "Clase modificada");
  };

    return (
    <main className='create-class-main'>
      <form className='create-class-inner' onSubmit={handleSubmit}>
        <h1>Editar clase</h1>

        {/* Nombre materia */}
        <div className='class-name'>
          <label>Nombre de la materia</label>
          <input type="text" value={nombreMateria} onChange={(e) => setNombreMateria(e.target.value)} />
        </div>

        {/* Curso */}
        <div className='class-course'>
          <label>Curso</label>
          <div className="center">
            <div className='o'>
              <select value={courseOValue} onChange={(e) => setCourseOValue(e.target.value)}>
                <option value="">-</option>
                <option value="1">1</option><option value="2">2</option><option value="3">3</option>
                <option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option>
              </select>
              <p>o</p>
            </div>
            <div className='a'>
              <select value={courseAValue} onChange={(e) => setCourseAValue(e.target.value)}>
                <option value="">-</option>
                {opcionesFiltradasA.map((op) => (
                  <option key={op} value={op}>{op}</option>
                ))}
              </select>
              <p>a</p>
            </div>
          </div>
        </div>

        {/* Grupo taller */}
        <div className='lab-group'>
          <label>Grupo de taller</label>
          <div className='lab-number'>
            <div>
              <input type="text" value={labInputValue} disabled />
            </div>
            <select value={labSelectValue} onChange={(e) => setLabSelectValue(e.target.value)} disabled={noAplica}>
              <option value="">-</option>
              {labOptions.map((op) => (
                <option key={op} value={op}>{op}</option>
              ))}
            </select>
          </div>
          <div className='lab-checkbox'>
            <input type="checkbox" checked={noAplica} onChange={handleNoAplicaChange} />
            <label>No aplica</label>
          </div>
        </div>

        {/* Cantidad clases */}
        <div className='class-quantity'>
          <label>Cantidad de clases:</label>
          <input type="number" value={cantidadClases} onChange={(e) => setCantidadClases(e.target.value)} />
        </div>

        {/* Cuatrimestre */}
        <div className='quadrimester'>
          <label>Cuatrimestre:</label>
          <select value={cuatrimestre} onChange={(e) => setCuatrimestre(e.target.value)}>
            <option value="">-</option>
            <option value="Primero">Primero</option>
            <option value="Segundo">Segundo</option>
          </select>
        </div>

        {/* Botón */}
        <div className='class-button'>
          <button type="submit">Guardar cambios</button>
        </div>
      </form>
    </main>
  );
}


export default EditClass;
