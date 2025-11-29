import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {

  const [showPassword, setShowPassword] = useState(false)

  const preventSpaces = (e) => {
    if (e.key === " ") e.preventDefault();
  };

  const cleanSpaces = (e) => {
    e.target.value = e.target.value.replace(/\s+/g, "").toLowerCase();
  };

  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()\-_+=\{\}\[\]:;,.?\/\\|~`]+$/;

  function handlePasswordChange(e) {
    const value = e.target.value;
    if (value === "" || passwordRegex.test(value)) {
      setPassword(value); 
    }
  }

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try{
      const res = await fetch("http://localhost:3000/api/iniciar-sesion", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          Correo: email,
          Contraseña: password
        })
      });

      const data = await res.json();

      if (!res.ok){
        setError(data.message || "Error durante el inicio de sesión")
        return;
      }
      localStorage.setItem("usuario", JSON.stringify(data))
      window.location.href = "/dashboard"
    } catch (err){
      console.error(err)
      setError("Error al conectar con el server")
    }
  }



  return (
    <main className='login-main'>
      <form className='login-inner' onSubmit={handleSubmit}>
          <div className='login-header'>
            <h1>Inicia sesión en tu cuenta</h1>
            <p>Ingresa tu mail debajo para iniciar sesión en tu cuenta</p>
          </div>
          <div className='email-input'>
            <label htmlFor="">Email</label>
            <input type="email" placeholder='nombre@empresa.com' value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={preventSpaces} onInput={cleanSpaces}/>
          </div>
          <div className='password-input'>
            <div className='password-label'>
              <label htmlFor="">Contraseña</label>
              <Link>¿Olvidaste tu contraseña?</Link>
            </div>
            <div className='password-field'>
              <input type={showPassword ? "text" : "password"} name="" id="" placeholder='••••••••' maxLength={255} value={password} onChange={handlePasswordChange} />
              <button onClick={() => setShowPassword(!showPassword)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg></button>
            </div>
          </div>
          <div className='login-buttons'>
            <button type='submit'>Iniciar sesión</button>
          </div>
          <div className='link-register'>
            <p>¿No tienes cuenta? <Link to="/signup">¡Regístrate aquí!</Link></p>
          </div>
      </form>
    </main>
  )
}

export default Login
