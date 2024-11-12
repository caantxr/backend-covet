const ReservationModel = require("../models/nosql/reservation");

const dbGetReservations = async () => {
    return await ReservationModel.find().populate('userId eventId');
};

const dbGetReservationById = async (id) => {
    return await ReservationModel.findById(id).populate('userId eventId');
};

const dbInsertReservation = async (newReservation) => {
    const reservation = new ReservationModel(newReservation);
    return await reservation.save();
};

const dbUpdateReservation = async (id, updatedReservation) => {
    return await ReservationModel.findByIdAndUpdate(id, updatedReservation, { new: true });
};

const dbDeleteReservation = async (id) => {
    return await ReservationModel.findByIdAndDelete(id);
};
const dbGetReservationsByUserId = async (userId) => {
    return await ReservationModel.find({userId}).populate('userId eventId');
};

module.exports = {
    dbGetReservations,
    dbGetReservationById,
    dbInsertReservation,
    dbUpdateReservation,
    dbDeleteReservation,
    dbGetReservationsByUserId
};