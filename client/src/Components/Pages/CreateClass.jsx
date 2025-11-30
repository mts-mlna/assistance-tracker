import React from 'react'
import { useState, useEffect } from 'react';

function CreateClass() {

  const [courseOValue, setCourseOValue] = useState("");
  const [courseAValue, setCourseAValue] = useState("");
    
  const [labSelectValue, setLabSelectValue] = useState("");

  // Mapa de restricciones
  const restricciones = {
    "1": ["1", "2", "3", "4", "6"],
    "2": ["1", "2", "3", "4", "6"],
    "3": ["1", "2", "3", "4", "6"],
    "4": ["1", "2", "3", "4"],
    "5": ["1", "2", "3", "4"],
    "6": ["1", "3"],
    "7": ["1", "2"],
  };

  // Opciones originales de "a"
  const opcionesA = ["1", "2", "3", "4", "6"];

  // Obtener opciones válidas según "o"
  const opcionesFiltradasA = courseOValue ? restricciones[courseOValue] : opcionesA;

  // Si el usuario tenía un valor que ya no es válido, resetear
  if (courseAValue && courseOValue && !opcionesFiltradasA.includes(courseAValue)) {
    setCourseAValue("");
  }

  const [labInputValue, setLabInputValue] = useState("");
  const [labValue, setLabValue] = useState("");

  const labRules = {
    // 1 en 'o'
    "1-1": ["2", "4"],
    "1-2": ["1", "3"],
    "1-3": ["6", "8"],
    "1-4": ["5", "7"],
    "1-6": ["9", "11"],

    // 2 en 'o'
    "2-1": ["2", "4"],
    "2-2": ["1", "3"],
    "2-3": ["6", "8"],
    "2-4": ["5", "7"],
    "2-6": ["9", "11"],

    // 3 en 'o'
    "3-1": ["2", "4"],
    "3-2": ["1", "3"],
    "3-3": ["6", "8"],
    "3-4": ["5", "7"],
    "3-6": ["9", "11"],

    // 4 en 'o'
    "4-1": ["2", "8"],
    "4-2": ["1", "3"],
    "4-3": ["4", "6"],
    "4-4": ["5", "7"],

    // 5 en 'o'
    "5-1": ["4", "8"],
    "5-2": ["1", "3"],
    "5-3": ["2", "6"],
    "5-4": ["5", "7"],

    // 6 en 'o'
    "6-1": ["2", "6"],
    "6-3": ["4", "8"],

    // 7 en 'o'
    "7-1": ["1", "3"],
    "7-2": ["2", "4"],
  };

  const labKey = `${courseOValue}-${courseAValue}`;
  const labOptions = labRules[labKey] || [];  // Si no existe combinación, queda vacío

  if (labValue && !labOptions.includes(labValue)) {
    setLabValue("");
  }

  const [noAplica, setNoAplica] = useState(false);

  const handleNoAplicaChange = () => {
    setNoAplica(prev => {
      const newValue = !prev;

      if (newValue) {
        setLabInputValue(""); // solo limpia el input del lab-group
        setLabValue("");      // solo limpia el select del lab-group
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

  return (
    <main className='create-class-main'>
      <div className='create-class-inner'>
        <div><h1>Crear una clase nueva</h1></div>
        <div className='class-name'>
          <label htmlFor="">Nombre de la materia</label>
          <input type="text" name="" id="" />
        </div>
        <div className='class-course'>
          <label htmlFor="">Curso</label>
          <div className="center">
            <div className='o'>
              <select value={courseOValue} onChange={(e) => setCourseOValue(e.target.value)}>
                <option value="">-</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
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
        <div className='lab-group'>
          <label htmlFor="">Grupo de taller</label>
          <div className='lab-number'>
            <div>
              <input type="text" value={labInputValue} disabled/>
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
            <label htmlFor="">No aplica</label>
          </div>
        </div>
        <div className='class-quantity'>
          <label htmlFor="">Cantidad de clases:</label>
          <input type="number" name="" id="" />
        </div>
        <div className='quadrimester'>
          <label htmlFor="">Cuatrimestre:</label>
          <select name="" id="">
            <option value="">-</option>
            <option value="">Primero</option>
            <option value="">Segundo</option>
          </select>
        </div>
        <div className='class-button'>
          <button>Crear clase</button>
        </div>
      </div>
    </main>
  )
}

export default CreateClass
