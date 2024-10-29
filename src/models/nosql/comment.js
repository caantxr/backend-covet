const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
    {
        eventId: {
            type: mongoose.Schema.Types.ObjectId, // referencia a evento
            ref: 'events',
            required: true // Campo requerido
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId, // referencia al usuario
            ref: 'users',
            required: true // Campo requerido
        },
        content: {
            type: String,
            required: true, // Campo requerido
            minlength: 1,    // Longitud mínima
            maxlength: 500   // Longitud máxima
        }
    },
    {
        timestamps: true,  // Crea campos createdAt y updatedAt automáticamente
        versionKey: false
    }
);

module.exports = mongoose.model("comments", CommentSchema);
