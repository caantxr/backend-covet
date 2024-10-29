const CommentModel = require("../models/nosql/comment");

const dbGetCommentsByEventId = async (eventId) => {
    return await CommentModel.find({ eventId }).populate('userId', 'name email'); // Puedes personalizar los campos que deseas devolver del usuario
};

const dbInsertComment = async (newComment) => {
    const comment = new CommentModel(newComment);
    return await comment.save();
};

const dbUpdateComment = async (id, updatedComment) => {
    return await CommentModel.findByIdAndUpdate(id, updatedComment, { new: true });
};

const dbDeleteComment = async (id) => {
    return await CommentModel.findByIdAndDelete(id);
};

module.exports = {
    dbGetCommentsByEventId,
    dbInsertComment,
    dbUpdateComment,
    dbDeleteComment
};