const express = require('express');
const router = express.Router();
const {
    getReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation,
    getReservationsByUserId
} = require('../controllers/reservations'); // Asegúrate de que el controlador esté bien definido

// Obtener todas las reservas
// Respuesta: Array de reservas
router.get('/', getReservations);

// Crear nueva reserva
// Requiere: { userId, eventId, numberOfTickets, reservationDate, status }
// Respuesta: Objeto de la nueva reserva creada
router.post('/', createReservation);


// Obtener reserva por ID
// Respuesta: Objeto de reserva si existe
router.get('/:id', getReservationById);



// Actualizar reserva
// Requiere: { numberOfTickets, status } (solo los campos que se deseen actualizar)
// Respuesta: Objeto de la reserva actualizada
router.put('/:id', updateReservation);

// Eliminar reserva
// Respuesta: Mensaje de éxito o error
router.delete('/:id', deleteReservation);


router.get('/user/:id', getReservationsByUserId );

module.exports = router;
