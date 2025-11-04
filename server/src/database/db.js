const SQLite3 = require('sqlite3')
const ruta = require('path')
const SQLite3_location = ruta.resolve(__dirname,'./db.db')

const db_create = new SQLite3.Database(SQLite3_location,(Error)=>{
    if(Error){
        console.error('Error al crear la base de datos')
    }
    else{
        console.log('Base de datos creada correctamente')
        db_create.run(
            // TODO: Completar abajo con las tablas y columnas que hagan falta
            `
                CREATE TABLE IF NOT EXISTS Alumnos(
                    
                )
            `
        )
    }
})

module.exports = db_create;