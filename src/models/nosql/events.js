const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true // Campo requerido
        },
        description: {
            type: String
        },
        urlImg: {
            type: String
        },
        category: [{
            type: mongoose.Schema.Types.ObjectId, // Referencia a múltiples eventos
            ref: 'categories'
        }],
        date: {
            type: Date,
            required: true, // Campo requerido
        },
        location: {
            type: String,
            required: true // Campo requerido
        },
        capacity: {
            type: Number,
            required: true, // Campo requerido
            min: 1 // Validación: debe ser un número positivo
        },
        price: {
            type: Number,
            required: true, // Campo requerido
            min: 0 // Validación: debe ser un número positivo
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId, // referencia a User
            ref: 'users',
            required: true // Campo requerido
        }
    },
    {
        timestamps: true,  // Crea campos createdAt y updatedAt automáticamente
        versionKey: false
    }
);

module.exports = mongoose.model("events", EventSchema);