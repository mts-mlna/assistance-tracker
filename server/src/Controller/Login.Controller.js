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
        if (err) return res.status(500).send("Error del servidor");
        if (!usuario) return res.status(400).send("Token inválido");

        // Mostrar botones para elegir rol
        return res.send(`
            <html>
                <head>
                    <title>Confirmar Rol</title>
                    <style>
                        body { font-family: sans-serif; text-align: center; margin-top: 10%; }
                        button {
                            padding: 15px 30px;
                            margin: 20px;
                            font-size: 18px;
                            background-color: #FF4D50;
                            border: 2px solid #111;
                            border-radius: 5px;
                            cursor: pointer;
                        }
                    </style>
                </head>
                <body>
                    <h1>¿Cómo querés confirmar tu cuenta?</h1>
                    <form method="POST" action="/api/confirmar-rol">
                        <input type="hidden" name="token" value="${token}" />
                        <button type="submit" name="rol" value="Profesor">Confirmar como Profesor</button>
                        <button type="submit" name="rol" value="Preceptor">Confirmar como Preceptor</button>
                    </form>
                </body>
            </html>
        `);
    });
};

const ConfirmarRol = (req, res) => {
    const { token, rol } = req.query;

    if (!token || !rol) {
        return res.status(400).send("Faltan datos");
    }

    const BuscarToken = `SELECT * FROM Usuario WHERE TokenVerificacion = ?`;

    db.get(BuscarToken, [token], (err, usuario) => {
        if (err) return res.status(500).send("Error del servidor");
        if (!usuario) return res.status(400).send("Token inválido");

        const Confirmar = `
            UPDATE Usuario 
            SET Verificado = 1, TokenVerificacion = NULL, Rol = ?
            WHERE Id = ?
        `;

        db.run(Confirmar, [rol, usuario.Id], (err2) => {
            if (err2) return res.status(500).send("Error al confirmar rol");

            return res.send(`<h1>Cuenta confirmada como ${rol} ✔</h1>`);
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

module.exports = { RegistrarUsuario, IniciarSesion, ListarUsuarios, EliminarUsuario, VerificarCuenta, ConfirmarRol };