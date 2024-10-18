const { MongoOIDCError, ObjectId } = require("mongodb")
const mongoose = require("mongoose")

const CategoryScheme = new mongoose.Schema(
    {
        name:{
            type:String 
        },
        description:{
            type:String 
        },
        events:{
            type:mongoose.Schema.Types.ObjectId, //referencia al evento
            ref:'events'
        }
    },
    {
        timestamps:true,  //TODO createAt, updatedAt
        versionKey:false
    }
);

module.exports = mongoose.model("categories", CategoryScheme)