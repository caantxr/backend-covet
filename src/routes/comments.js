const express = require("express");
const router = express.Router();
const { createComment, getCommentsByEvent } = require("../controllers/comments");

// Ruta para crear un comentario
// Requiere: { eventId, userId, content }
// Respuesta: Objeto del comentario creado
router.post("/events/:eventId/comments", createComment);

// Ruta para obtener comentarios por evento
// Respuesta: Array de comentarios para el evento especificado
router.get("/events/:eventId/comments", getCommentsByEvent);

module.exports = router;
