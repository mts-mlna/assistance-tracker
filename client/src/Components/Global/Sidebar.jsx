import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import guest from '../../assets/guest.jpg'
import '../Layouts.css'

const Sidebar = ({ isOpen, onClose }) => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("usuario");
        onClose();
        navigate("/login");
    };

    return (
        <>
        <aside className={`sidebar ${isOpen ? "open" : ""}`}>
            <button className='close-btn' onClick={onClose}>
                ✖
            </button>

            <nav className='sidebar-content'>
                <ul>
                    <li><Link to="/Table" onClick={onClose}>Dashboard</Link></li>
                    <li>
                        <Link to="/classes" onClick={onClose}>
                            {usuario?.Rol === "Preceptor" ? "Cursos" : "Mis cursos"}
                        </Link>
                    </li>
                    <li><a href="" onClick={onClose}>Tomar asistencia</a></li>
                    {/* <li><a href="" onClick={onClose}>Mis alumnos</a></li> */}
                    <li><Link to="/login" onClick={onClose}>Iniciar sesión</Link></li>
                    <li><Link to="/signup" onClick={onClose}>Crear cuenta</Link></li>
                    {/* <li><Link to="/admin/students" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                             viewBox="0 0 24 24" fill="none" stroke="#F9F9F9"
                             strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                             <path d="M9 18l6-6-6-6"/>
                        </svg>
                        Panel admin.
                    </Link></li> */}
                </ul>
                <ul>
                    <li className='profile'>
                        <a href="">
                            <img src={guest} alt="" />
                            <div>
                                <h1>Invitado</h1>
                                <p>Sin sesión</p>
                            </div>
                        </a>
                    </li>
                    <li className='action-buttons'>
                        <a href="" className='edit'>Editar perfil</a>
                        {/* 👇 ahora es un botón con lógica */}
                        <button className='logout' onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>

        {isOpen && <div className='overlay' onClick={onClose}></div>}
        </>
    )
}

export default Sidebar
