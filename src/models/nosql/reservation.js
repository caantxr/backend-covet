const mongoose = require("mongoose")

const ReservationScheme = new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,  //referencia a User
            ref:'users'
        },
        eventId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'events' //referencia al evento
        },
        numberOfTickets:{
            type:Number
        },
        reservationDate:{
            type:Date
        },
        status:{
            type:["confirmed","pending","cancelled"]
        }
    },
    {
        timestamps:true,  //TODO createAt, updatedAt
        versionKey:false
    }
);

module.exports = mongoose.model("reservations", ReservationScheme)