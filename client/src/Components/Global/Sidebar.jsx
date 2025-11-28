import React from 'react'
import { Link } from 'react-router-dom'
import guest from '../../assets/guest.jpg'
import '../Layouts.css'

const Sidebar = ({ isOpen, onClose }) => {
    return (
        <>
        <aside className={`sidebar ${isOpen ? "open" : ""}`}>
            <button className='close-btn' onClick={onClose}>
                ✖
            </button>

            <nav className='sidebar-content'>
                <ul>
                    <li>
                        <Link to="/Table">Dashboard</Link>
                    </li>
                    <li><a href="">Mis cursos</a></li>
                    <li><a href="">Tomar asistencia</a></li>
                    <li><a href="">Mis alumnos</a></li>
                    <li><Link to="/login" onClick={onClose}>Iniciar sesión</Link></li>
                    <li><Link to="/signup" onClick={onClose}>Crear cuenta</Link></li>
                    <li><Link to="/admin/students" onClick={onClose}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F9F9F9" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>Panel admin.</Link></li>
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
                        <a href="" className='logout'>Cerrar sesión</a>
                    </li>
                </ul>
            </nav>
        </aside>

        {isOpen && <div className='overlay' onClick={onClose}></div>}
        </>
    )
}

export default Sidebar