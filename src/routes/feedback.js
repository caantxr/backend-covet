const express = require("express");
const router = express.Router();
const {
    dbGetFeedbacks,
    dbInsertFeedback,
    dbUpdateFeedback,
    dbDeleteFeedback
} = require("../services/feedback");
const { authUser } = require("../middlewares/auth-user.middleware"); // Importar el middleware de autenticación

// Obtener feedbacks de un evento
router.get("/:eventId", async (req, res) => {
    try {
        const feedbacks = await dbGetFeedbacks(req.params.eventId);
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Insertar nuevo feedback
router.post("/", authUser, async (req, res) => { // Asegurarte de que el usuario esté autenticado
    const { rating, comment, eventId } = req.body;

    // Validar el rating
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "El rating debe estar entre 1 y 5." });
    }

    try {
        const feedback = await dbInsertFeedback({ userId: req.authUser.id, eventId, rating, comment });
        res.status(201).json(feedback);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar feedback
router.put("/:id", async (req, res) => {
    try {
        const feedback = await dbUpdateFeedback(req.params.id, req.body);
        res.json(feedback);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar feedback
router.delete("/:id", async (req, res) => {
    try {
        await dbDeleteFeedback(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
