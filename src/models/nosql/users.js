const mongoose = require("mongoose");

// Definición del esquema para usuarios
const UserScheme = new mongoose.Schema(
    {
        // Nombre del usuario
        name: {
            type: String,
            required: true, // Campo obligatorio
        },
        // Edad del usuario (debe ser un número positivo)
        age: {
            type: Number,
            min: 0, // La edad no puede ser negativa
        },
        // Correo electrónico del usuario
        email: {
            type: String,
            unique: true, // Debe ser único en la colección
            required: true, // Campo obligatorio
            match: /.+\@.+\..+/ // Validación básica de formato de correo
        },
        // Contraseña del usuario
        password: {
            type: String,
            required: true, // Campo obligatorio
            minlength: 8, // Mínimo 8 caracteres
        },
        // Rol del usuario
        role: {
            type: String, 
            enum: ["user", "admin"], // Los únicos valores permitidos
            default: "user", // Valor por defecto
        }
    },
    {
        timestamps: true,  // Crea automáticamente createdAt y updatedAt
        versionKey: false  // Desactiva el campo __v que mongoose agrega automáticamente
    }
);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = mongoose.model("users", UserScheme);
