const CommentModel = require("../models/nosql/comment");

const createComment = async (req, res) => {
    const { eventId, userId, content } = req.body;

    try {
        const newComment = new CommentModel({ eventId, userId, content });
        await newComment.save();
        res.status(201).json({ ok: true, comment: newComment });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al crear el comentario', error });
    }
};

const getCommentsByEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        const comments = await CommentModel.find({ eventId });
        res.json({ ok: true, comments });
    } catch (error) {
        res.status(500).json({ ok: false, msg: 'Error al obtener comentarios', error });
    }
};

module.exports = {
    createComment,
    getCommentsByEvent
};