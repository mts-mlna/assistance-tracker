const db = require('../database/DataBase')
const { EncriptarPassword, CompararPassword } = require('../utils/PasswordHash');
const crypto = require("crypto");
const { enviarCorreoVerificacion } = require("../utils/Email")
const jwt = require("jsonwebtoken")

const RegistrarUsuario = async (req, res) => {
    try {
        const { Correo, Contraseña } = req.body;

        if (!Correo || !Contraseña) {
            return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
        }

        const Nombre = Correo.split("@")[0];
        const Rol = "Desconocido";

        db.get("SELECT * FROM Usuario WHERE Correo = ?", [Correo], async (error, fila) => {
            if (error) return res.status(500).json({ Error: "Error del servidor" });

            if (fila) {
                return res.status(400).json({ mensaje: "El usuario ya existe" });
            }

            const Hash = await EncriptarPassword(Contraseña);

            // generar token único
            const TokenVerificacion = crypto.randomBytes(32).toString("hex");

            const Insertar = `
                INSERT INTO Usuario (Nombre, Correo, Contraseña, Rol, Verificado, TokenVerificacion)
                VALUES (?, ?, ?, ?, 0, ?)
            `;

            db.run(Insertar, [Nombre, Correo, Hash, Rol, TokenVerificacion], async function (err) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ mensaje: "Error al registrar usuario" });
                }

                // ENVIAR CORREO
                await enviarCorreoVerificacion(Correo, TokenVerificacion);

                return res.status(201).json({
                    mensaje: "Usuario registrado. Revisa tu email para verificar tu cuenta."
                });
            });
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ mensaje: "Error del servidor" });
    }
};

const VerificarCuenta = (req, res) => {
    const { token } = req.params;

    const BuscarToken = `SELECT * FROM Usuario WHERE TokenVerificacion = ?`;

    db.get(BuscarToken, [token], (err, usuario) => {
        if (err) return res.status(500).json({ mensaje: "Error del servidor" });
        if (!usuario) return res.status(400).json({ mensaje: "Token inválido" });

        const Verificar = `
            UPDATE Usuario 
            SET Verificado = 1, TokenVerificacion = NULL
            WHERE Id = ?
        `;

        db.run(Verificar, [usuario.Id], (err2) => {
            if (err2) return res.status(500).json({ mensaje: "Error al activar la cuenta" });

            return res.send(`<h1>Cuenta verificada con éxito ✔</h1>`);
        });
    });
};

const IniciarSesion = (req, res) => {
    const { Correo, Contraseña } = req.body;

    if (!Correo || !Contraseña) {
        return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
    }

    const Consulta = `SELECT * FROM Usuario WHERE Correo = ?`;

    db.get(Consulta, [Correo], async (error, usuario) => {
        if (error) {
            console.error('❌ Error al iniciar sesión:', error.message);
            return res.status(500).json({ Error: 'Error del servidor' });
        }

        if (!usuario) {
            return res.status(400).json({ mensaje: 'Usuario no encontrado' });
        }

        const valido = await CompararPassword(Contraseña, usuario.Contraseña);

        if (!valido) {
            return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
        }

        return res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            Id: usuario.Id,
            Nombre: usuario.Nombre,
            Correo: usuario.Correo,
            Rol: usuario.Rol
        });
    });
};

const ListarUsuarios = (req, res) => {
    db.all('SELECT * FROM Usuario', [], (error, filas) => {
        if (error) return res.status(500).json({ Error: 'Error al listar usuarios' });
        res.status(200).json({ Usuarios: filas });
    });
};

const EliminarUsuario = (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM Usuario WHERE Id = ?', [id], function (error) {
        if (error) return res.status(500).json({ Error: 'Error al eliminar usuario' });
        res.status(200).json({ mensaje: 'Usuario eliminado con éxito' });
    });
};

module.exports = { RegistrarUsuario, IniciarSesion, ListarUsuarios, EliminarUsuario, VerificarCuenta };