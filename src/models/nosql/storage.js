const mongoose = require("mongoose");

// Definición del esquema para el almacenamiento de archivos
const StorageScheme = new mongoose.Schema(
    {
        // URL donde se almacena el archivo
        url: {
            type: String,
            required: true, // Campo obligatorio
            validate: {
                // Validación para asegurar que la URL tenga un formato correcto
                validator: function(v) {
                    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
                    return urlRegex.test(v);
                },
                message: props => `${props.value} no es una URL válida!` // Mensaje de error
            }
        },
        // Nombre del archivo almacenado
        filename: {
            type: String,
            required: true // Campo obligatorio
        },
    },
    {
        timestamps: true,  // Crea automáticamente createdAt y updatedAt
        versionKey: false  // Desactiva el campo __v que mongoose agrega automáticamente
    }
);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = mongoose.model("storages", StorageScheme);
