const { MongoOIDCError, ObjectId } = require("mongodb")
const mongoose = require("mongoose")

const PromotionScheme = new mongoose.Schema(
    {
        eventId:{
            type:mongoose.Schema.Types.ObjectId, //referencia a Event
            ref: 'events'
        },
        discountPercentage:{
            type:Number
        },
        startDate:{
            type:Date
        },
        endDate:{
            type:Date
        },
        code:{
            type:String //codigo de promocion
        }
    },
    {
        timestamps:true,  //TODO createAt, updatedAt
        versionKey:false
    }
);

module.exports = mongoose.model("promotions", PromotionScheme)