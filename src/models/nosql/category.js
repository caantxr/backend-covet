const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true, // Hacer que el nombre sea requerido
            minlength: 3,   // Longitud mínima
            maxlength: 50   // Longitud máxima
        },
        description: {
            type: String,
            maxlength: 200  // Longitud máxima para la descripción
        },
        events: [{
            type: mongoose.Schema.Types.ObjectId, // Referencia a múltiples eventos
            ref: 'events'
        }]
    },
    {
        timestamps: true,  // Crea campos createdAt y updatedAt automáticamente
        versionKey: false
    }
);

module.exports = mongoose.model("categories", CategorySchema);