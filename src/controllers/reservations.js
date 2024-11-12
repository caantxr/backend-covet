const { dbGetReservations, dbGetReservationById, dbInsertReservation, dbUpdateReservation, dbDeleteReservation, dbGetReservationsByUserId } = require("../services/reservation");

// Controlador para obtener todas las reservas
const getReservations = async (req, res) => {
    try {
        const reservations = await dbGetReservations();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las reservas." });
    }
};
const getReservationsByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await dbGetReservationsByUserId(id);
        if (!reservation) return res.status(404).json({ error: "Reservas del usuario no encontradas." });
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las reservas por id de usuario." });
    }
};
// Controlador para obtener una reserva por ID
const getReservationById = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await dbGetReservationById(id);
        if (!reservation) return res.status(404).json({ error: "Reserva no encontrada." });
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la reserva." });
    }
};

// Controlador para crear una nueva reserva
const createReservation = async (req, res) => {
    const { userId, eventId, numberOfTickets, reservationDate, status } = req.body;
    try {
        const newReservation = { userId, eventId, numberOfTickets, reservationDate, status };
        const reservation = await dbInsertReservation(newReservation);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ error: "Error al crear la reserva." });
    }
};

// Controlador para actualizar una reserva existente
const updateReservation = async (req, res) => {
    const { id } = req.params;
    const { userId, eventId, numberOfTickets, reservationDate, status } = req.body;
    try {
        const updatedReservation = { userId, eventId, numberOfTickets, reservationDate, status };
        const reservation = await dbUpdateReservation(id, updatedReservation);
        if (!reservation) return res.status(404).json({ error: "Reserva no encontrada." });
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la reserva." });
    }
};

// Controlador para eliminar una reserva
const deleteReservation = async (req, res) => {
    const { id } = req.params;
    try {
        const reservation = await dbDeleteReservation(id);
        if (!reservation) return res.status(404).json({ error: "Reserva no encontrada." });
        res.status(200).json({ message: "Reserva eliminada con éxito." });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la reserva." });
    }
};

module.exports = {
    getReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation,
    getReservationsByUserId
};
