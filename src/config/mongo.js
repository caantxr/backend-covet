const mongoose = require("mongoose");

async function dbConnect() {
    try {
        await mongoose.connect(process.env.DB_URI,{});
        console.log('Se realizo la conexion a la Base de datos')
    }
    catch (error) {
        console.log('Error de conexion:', error.message)
    }
}

module.exports = dbConnect