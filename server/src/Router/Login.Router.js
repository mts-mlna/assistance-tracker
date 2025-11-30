const Express = require('express');

const Rutas = Express.Router();

const { RegistrarUsuario, IniciarSesion, ListarUsuarios, EliminarUsuario, VerificarCuenta } = require('../controller/Login.Controller');

Rutas.post('/registrar', RegistrarUsuario);
Rutas.post('/iniciar-sesion', IniciarSesion);
Rutas.get('/usuarios', ListarUsuarios);
Rutas.get('/verificar/:token', VerificarCuenta);
Rutas.delete('/eliminar-usuario/:id', EliminarUsuario);

module.exports = Rutas;