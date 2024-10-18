const { MongoOIDCError, ObjectId } = require("mongodb")
const mongoose = require("mongoose")

const EventFeedbackScheme = new mongoose.Schema(
    {
        eventId:{
            type:mongoose.Schema.Types.ObjectId, //referencia a Event
            ref:'events'
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId, //referencia a User
            ref:'users'
        },
        rating:{
            date:Number,
        },
        comment:{
            type:String
        },
        createdAt:{
            type:Date
        }
    },
    {
        timestamps:true,  //TODO createAt, updatedAt
        versionKey:false
    }
);

module.exports = mongoose.model("event-feedbacks", EventFeedbackScheme)