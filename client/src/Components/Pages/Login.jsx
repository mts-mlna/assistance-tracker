import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className='login-main'>
      <section className='login-inner'>
          <div className='login-header'>
            <h1>Inicia sesión en tu cuenta</h1>
            <p>Ingresa tu mail debajo para iniciar sesión en tu cuenta</p>
          </div>
          <div className='email-input'>
            <label htmlFor="">Email</label>
            <input type="email" name="" id="" placeholder='' />
          </div>
          <div className='password-input'>
            <div className='password-label'>
              <label htmlFor="">Contraseña</label>
              <Link>¿Olvidaste tu contraseña?</Link>
            </div>
            <div className='password-field'>
              <input type={showPassword ? "text" : "password"} name="" id=""/>
              <button onClick={() => setShowPassword(!showPassword)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
            </div>
          </div>
          <div className='login-buttons'>
            <button>Iniciar sesión</button>
          </div>
          <div className='link-register'>
            <p>¿No tienes cuenta? <Link to="/signup">¡Regístrate aquí!</Link></p>
          </div>
      </section>
    </main>
  )
}

export default Login
