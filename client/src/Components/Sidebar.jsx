import React from 'react'
import Facu from '../assets/146157552.jfif'
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
                    <li><a href="">Inixio</a></li>
                    <li><a href="">Sobre Noxotros</a></li>
                    <li><a href="">Configuraxion</a></li>
                </ul>
                <ul>
                    <li className='profile'>
                        <a href="">
                            <img src={Facu} alt="" />
                            <div>
                                <h1>Gareis, Pablo</h1>
                                <p>Profesor</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>

        {isOpen && <div className='overlay' onClick={onClose}></div>}
        </>
    )
}

export default Sidebar