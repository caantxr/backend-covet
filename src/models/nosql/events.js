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
        date: {
            type: Date,
            required: true, // Campo requerido
            validate: {
                validator: function(value) {
                    return value >= new Date(); // Validación: la fecha no puede ser en el pasado
                },
                message: 'La fecha debe ser igual o posterior a la fecha actual.'
            }
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