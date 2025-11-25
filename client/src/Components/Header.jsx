import React from 'react'
import Logo from '../assets/logo.png'

const Header = ({ onToggleSidebar }) => {
  return(
    <header>
        <nav className='navigation'>
            <ul>
                <li>
                    <a href="">
                        <img src={Logo} alt="" className='logo'/>
                    </a>
                </li>
                <li>
                    <a href="">
                        <p>Inicio</p>
                        <div className='underline'></div>
                    </a>
                </li>
                <li>
                    <a href="">
                        <p>Contacto</p>
                        <div className='underline'></div>
                    </a>
                </li>
                <li>
                    <a href="">
                        <p>Información</p>
                        <div className='underline'></div>
                    </a>
                </li>
            </ul>
            <ul>
                <li>
                    <button className='open-sidebar' onClick={onToggleSidebar}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F9F9F9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 9.5H3M21 4.5H3M21 14.5H3M21 19.5H3"/></svg>
                    </button>
                </li>
            </ul>
        </nav>
      </header>
  )
}

export default Header