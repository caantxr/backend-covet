const EventFeedbackModel = require("../models/nosql/feedback");

const dbGetFeedbacks = async (eventId) => {
    return await EventFeedbackModel.find({ eventId }).populate('userId');
};

const dbInsertFeedback = async (newFeedback) => {
    const feedback = new EventFeedbackModel(newFeedback);
    return await feedback.save();
};

const dbUpdateFeedback = async (id, updatedFeedback) => {
    return await EventFeedbackModel.findByIdAndUpdate(id, updatedFeedback, { new: true });
};

const dbDeleteFeedback = async (id) => {
    return await EventFeedbackModel.findByIdAndDelete(id);
};

module.exports = {
    dbGetFeedbacks,
    dbInsertFeedback,
    dbUpdateFeedback,
    dbDeleteFeedback
};
