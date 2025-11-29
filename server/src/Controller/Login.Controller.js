const db = require('../database/DataBase')
const { EncriptarPassword, CompararPassword } = require('../utils/PasswordHash');

const RegistrarUsuario = async (req, res) => {
    try {
        const { Nombre, Correo, Contraseña, Rol } = req.body;

        if (!Nombre || !Correo || !Contraseña || !Rol) {
            return res.status(400).json({ mensaje: 'Faltan datos obligatorios' });
        }

        const VerificarUsuario = `SELECT * FROM Usuario WHERE Correo = ?`;

        db.get(VerificarUsuario, [Correo], async (error, fila) => {
            if (error) {
                console.error('❌ Error al verificar usuario:', error.message);
                return res.status(500).json({ Error: 'Error del servidor' });
            }

            if (fila) {
                return res.status(400).json({ mensaje: 'El usuario ya existe' });
            }

            // Hash dentro del callback
            const Hash = await EncriptarPassword(Contraseña);

            const InsertarUsuario = `
                INSERT INTO Usuario (Nombre, Correo, Contraseña, Rol)
                VALUES (?, ?, ?, ?)
            `;

            db.run(InsertarUsuario, [Nombre, Correo, Hash, Rol], function (error) {
                if (error) {
                    console.error('❌ Error al registrar usuario:', error.message);
                    return res.status(500).json({ Error: 'Error al registrar el usuario' });
                }

                return res.status(201).json({
                    mensaje: 'Usuario registrado con éxito',
                    Id: this.lastID,
                    Nombre,
                    Correo,
                    Rol
                });
            });
        });

    } catch (error) {
        console.error('❌ Error en servidor:', error.message);
        return res.status(500).json({ Error: 'Error del servidor' });
    }
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

module.exports = { RegistrarUsuario, IniciarSesion, ListarUsuarios, EliminarUsuario };