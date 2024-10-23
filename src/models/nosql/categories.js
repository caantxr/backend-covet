const mongoose = require("mongoose");

const CategoryScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true // Hacer que el nombre sea requerido
        },
        description: {
            type: String
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

module.exports = mongoose.model("categories", CategoryScheme);