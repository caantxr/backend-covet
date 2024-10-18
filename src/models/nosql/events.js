const { MongoOIDCError, ObjectId } = require("mongodb")
const mongoose = require("mongoose")

const EventScheme = new mongoose.Schema(
    {
        title:{
            type:String
        },
        description:{
            type:String
        },
        date:{
            date:Date,
        },
        location:{
            type:String
        },
        capacity:{
            type:Number
        },
        price:{
            type:Number
        },
        createdBy:{
            type:mongoose.Schema.Types.ObjectId, // referencia a User
            ref:'users'
        }
    },
    {
        timestamps:true,  //TODO createAt, updatedAt
        versionKey:false
    }
);

module.exports = mongoose.model("events", EventScheme)