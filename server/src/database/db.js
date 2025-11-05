
const SQLite3 = require('sqlite3')

const Ruta = require('path');

const SQLite3_Ubicacion = Ruta.resolve(__dirname, './DataBase.db');

const db_crear = new SQLite3.Database(SQLite3_Ubicacion, (error) => {
    if (error) {
        console.error('❌ Error al conectar con la base de datos:', error.message);
    } else {
        console.log('🛠️ Se ha creado la Base De Datos');
        db_crear.run(`
            CREATE TABLE IF NOT EXISTS Usuario (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            Nombre TEXT NOT NULL,
            Correo TEXT NOT NULL UNIQUE,
            Contraseña TEXT NOT NULL,
            Rol TEXT NOT NULL
        )`, (error) => {
            if (error) {
                console.error('❌ Error al crear la tabla Usuario:', error.message);
            } else {
                console.log('✅ Tabla Usuario creada correctamente');
            }
        }
        );
    }
});

module.exports = db_crear;