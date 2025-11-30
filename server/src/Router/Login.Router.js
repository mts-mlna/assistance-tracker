const Express = require('express');

const Rutas = Express.Router();

const { RegistrarUsuario, IniciarSesion, ListarUsuarios, EliminarUsuario, VerificarCuenta, ConfirmarRol} = require('../Controller/Login.Controller');

Rutas.post('/registrar', RegistrarUsuario);
Rutas.post('/iniciar-sesion', IniciarSesion);
Rutas.get('/usuarios', ListarUsuarios);
Rutas.get('/verificar/:token', VerificarCuenta);
Rutas.delete('/eliminar-usuario/:id', EliminarUsuario);
Rutas.get('/confirmar-rol', ConfirmarRol);


module.exports = Rutas;