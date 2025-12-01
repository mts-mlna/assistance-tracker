import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Classes() {
    const [clases, setClases] = useState([]);
    const [selected, setSelected] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const usuario = JSON.parse(localStorage.getItem("usuario")); // 👈 lo usamos en la vista

    useEffect(() => {
        const fetchClases = async () => {
            try {
                if (!usuario) {
                    alert("Debes iniciar sesión para continuar");
                    return;
                }
                let res;
                if (usuario.Rol === "Preceptor") {
                    res = await fetch("http://localhost:3000/api/clases");
                } else {
                    res = await fetch(`http://localhost:3000/api/clases/profesor/${usuario.Id}`);
                }
                const data = await res.json();
                setClases(data.Clases || []);
            } catch (err) {
                console.error(err);
            }
        };
        fetchClases();
    }, [usuario]);

    const toggleSelect = (id) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const handleDeleteSelected = async () => {
        for (const id of selected) {
            await fetch(`http://localhost:3000/api/eliminar-clase/${id}`, {
                method: "DELETE"
            });
        }
        setClases(clases.filter(c => !selected.includes(c.Id)));
        setSelected([]);
    };

    const filteredClases = clases.filter(c => {
        const term = searchTerm.toLowerCase();
        return (
            c.NombreMateria.toLowerCase().includes(term) ||
            c.Curso.toLowerCase().includes(term) ||
            (c.GrupoTaller ? c.GrupoTaller.toLowerCase().includes(term) : false) ||
            c.Cuatrimestre.toLowerCase().includes(term)
        );
    });

    return (
        <main className='my-classes'>
            <div className='my-classes-inner'>
                <section className='my-classes-header'>
                    <h1>{usuario?.Rol === "Preceptor" ? "Cursos" : "Mis Cursos"}</h1>
                    <div className='my-classes-inner-action'>
                        <div className='my-classes-search'>
                            <input
                                type="text"
                                placeholder='Filtrar clase por nombre, curso, grupo de taller o cuatrimestre...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button onClick={() => setSearchTerm("")}>Limpiar</button>
                        </div>

                        {/* 👇 Ocultar botones si es Preceptor */}
                        {usuario?.Rol !== "Preceptor" && (
                            <div className='my-classes-buttons'>
                                <button className='delete-selected-class' onClick={handleDeleteSelected}>
                                    Eliminar selección
                                </button>
                                <Link to="/classes/new" className='new-class'>Nueva clase</Link>
                            </div>
                        )}
                    </div>
                </section>
                <section className='my-classes-grid'>
                    {filteredClases.map(clase => (
                        <div key={clase.Id} className='class'>
                            <div className='class-card-header'>
                                <div className='checkbox-wrapper'>
                                    {usuario?.Rol !== "Preceptor" && (
                                        <>
                                            <input
                                                type="checkbox"
                                                checked={selected.includes(clase.Id)}
                                                onChange={() => toggleSelect(clase.Id)}
                                            />
                                            <span className='custom-checkbox'></span>
                                        </>
                                    )}
                                </div>
                                {/* 👇 ahora el link lleva al curso específico */}
                                <Link to={`/table/${clase.Id}`}>
                                    <h1>{clase.NombreMateria}</h1>
                                </Link>
                            </div>

                            <div>
                                <p>Curso: <b>{clase.Curso}</b></p>
                                <p>Grupo: <b>{clase.GrupoTaller || "No aplica"}</b></p>
                                <p>Cuatrimestre: <b>{clase.Cuatrimestre}</b></p>
                                {usuario?.Rol === "Preceptor" && (
                                    <p>Profesor: <b>{clase.ProfesorNombre}</b></p>
                                )}
                            </div>
                            {/* 👇 Ocultar botón Editar si es Preceptor */}
                            {usuario?.Rol !== "Preceptor" && (
                                <div className='class-edit'>
                                    <button onClick={() => navigate(`/classes/edit/${clase.Id}`)}>
                                        Editar
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </section>
            </div>
        </main>
    );
}

export default Classes;
