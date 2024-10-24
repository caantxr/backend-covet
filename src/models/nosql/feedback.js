const mongoose = require("mongoose");

const EventFeedbackSchema = new mongoose.Schema(
    {
        eventId: {
            type: mongoose.Schema.Types.ObjectId, // referencia a Event
            ref: 'events',
            required: true // Campo requerido
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId, // referencia a User
            ref: 'users',
            required: true // Campo requerido
        },
        rating: {
            type: Number, // Calificación del evento
            required: true, // Campo requerido
            min: 1, // Validación: mínimo 1
            max: 5 // Validación: máximo 5
        },
        comment: {
            type: String // Comentario del usuario
        }
    },
    {
        timestamps: true,  // Crea automáticamente createdAt y updatedAt
        versionKey: false
    }
);

module.exports = mongoose.model("event-feedbacks", EventFeedbackSchema);
