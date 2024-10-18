const { MongoOIDCError, ObjectId } = require("mongodb")
const mongoose = require("mongoose")

const CommentScheme = new mongoose.Schema(
    {
        eventId:{
            type:mongoose.Schema.Types.ObjectId, //referencia a evento
            ref:'events'
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId, //referencia al user
            ref:'users'
        },
        content:{
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

module.exports = mongoose.model("comments", CommentScheme)