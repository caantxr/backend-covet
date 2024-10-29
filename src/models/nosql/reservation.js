const mongoose = require("mongoose");

// Definición del esquema para las reservas
const ReservationScheme = new mongoose.Schema(
    {
        // Referencia al usuario que realiza la reserva
        userId: {
            type: mongoose.Schema.Types.ObjectId, // Referencia a User
            ref: 'users',
            required: true // El campo es obligatorio
        },
        // Referencia al evento para el cual se realiza la reserva
        eventId: {
            type: mongoose.Schema.Types.ObjectId, // Referencia a Event
            ref: 'events',
            required: true // El campo es obligatorio
        },
        // Número de boletos reservados
        numberOfTickets: {
            type: Number,
            required: true, // El campo es obligatorio
            min: 1 // Asegúrate de que sea al menos 1
        },
        // Fecha en la que se realizó la reserva
        reservationDate: {
            type: Date,
            required: true // El campo es obligatorio
        },
        // Estado de la reserva
        status: {
            type: String,
            enum: ["confirmed", "pending", "cancelled"], // Define los estados válidos
            default: "pending" // Valor predeterminado
        }
    },
    {
        timestamps: true,  // Crea automáticamente createdAt y updatedAt
        versionKey: false // Desactiva el campo __v que mongoose agrega automáticamente
    }
);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = mongoose.model("reservations", ReservationScheme);
