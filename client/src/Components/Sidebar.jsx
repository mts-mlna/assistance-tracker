import React from 'react'
import guest from '../assets/guest.jpg'
import './Sidebar.css'

const Sidebar = ({ isOpen, onClose }) => {
    return (
        <>
        <aside className={`sidebar ${isOpen ? "open" : ""}`}>
            <button className='close-btn' onClick={onClose}>
                ✖
            </button>

            <nav className='sidebar-content'>
                <ul>
                    <li><a href="">Dashboard</a></li>
                    <li><a href="">Mis cursos</a></li>
                    <li><a href="">Tomar asistencia</a></li>
                    <li><a href="">Mis alumnos</a></li>
                    <li><a href="">Iniciar sesión</a></li>
                    <li><a href="">Crear cuenta</a></li>
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