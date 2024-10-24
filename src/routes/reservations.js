const express = require("express");
const router = express.Router();
const {
    dbGetReservations,
    dbGetReservationById,
    dbInsertReservation,
    dbUpdateReservation,
    dbDeleteReservation
} = require("../services/reservations");

// Obtener todas las reservas
router.get("/", async (req, res) => {
    try {
        const reservations = await dbGetReservations();
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener una reserva por ID
router.get("/:id", async (req, res) => {
    try {
        const reservation = await dbGetReservationById(req.params.id);
        if (!reservation) return res.status(404).json({ msg: "Reserva no encontrada" });
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear una nueva reserva
router.post("/", async (req, res) => {
    try {
        const newReservation = req.body;
        const createdReservation = await dbInsertReservation(newReservation);
        res.status(201).json(createdReservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar una reserva
router.put("/:id", async (req, res) => {
    try {
        const updatedReservation = await dbUpdateReservation(req.params.id, req.body);
        if (!updatedReservation) return res.status(404).json({ msg: "Reserva no encontrada" });
        res.json(updatedReservation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar una reserva
router.delete("/:id", async (req, res) => {
    try {
        const deletedReservation = await dbDeleteReservation(req.params.id);
        if (!deletedReservation) return res.status(404).json({ msg: "Reserva no encontrada" });
        res.json({ msg: "Reserva eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;