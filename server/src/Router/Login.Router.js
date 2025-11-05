 
const Express = require('express');

const Rutas = Express.Router();

const { RegistrarUsuario, IniciarSesion, ListarUsuarios, EliminarUsuario } = require('../Controller/Login.Controller');

Rutas.post('/registrar', RegistrarUsuario);
Rutas.post('/iniciar-sesion', IniciarSesion);
Rutas.get('/usuarios', ListarUsuarios);
Rutas.delete('/eliminar-usuario/:id', EliminarUsuario);

module.exports = Rutas;