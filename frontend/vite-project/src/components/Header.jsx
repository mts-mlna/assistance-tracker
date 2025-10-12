import React from 'react'
import logo from '../assets/logo.png'

function Header() {
  return (
    <header className='bg-white flex items-center h-[50px] px-[50px] content-between m-[15px] rounded-full'>
        <nav className='flex items-center justify-between gap-[25px] w-full'>
            <ul className='flex gap-[25px] font-poppins text-black font-bold'>
                <li className='transition-transform duration-100 hover:scale-105 hover:underline'><a href="">Inicio</a></li>
                <li className='transition-transform duration-100 hover:scale-105 hover:underline'><a href="">Info.</a></li>
            </ul>
            <ul>
                <li>
                    <a href="" className='flex items-center transition-transform duration-100 hover:scale-105 gap-[10px] bg-red-600 rounded-full p-[5px]'>
                        <img src={logo} alt="" className='size-[30px]' />
                        <h1 className='font-bold text-white'>CLASS MANAGER</h1>
                    </a>
                </li>
            </ul>
            <ul className='flex gap-[25px] font-poppins text-black font-bold'>
                <li className='transition-transform duration-100 hover:scale-105 hover:underline'><a href="">Dashboard</a></li>
                <li className='transition-transform duration-100 hover:scale-105 hover:underline'><a href="">Cuenta</a></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header
