const { MongoOIDCError } = require("mongodb")
const mongoose = require("mongoose")

const UserScheme = new mongoose.Schema(
    {
        name:{
            type:String
        },
        age:{
            type:Number
        },
        email:{
            type:String,
            unique:true
        },
        password:{
            type:String
        },
        role:{
            type: String, 
            enum: [ "user", "admin" ],
            default: "user",
        }
    },
    {
        timestamps:true,  //TODO createAt, updatedAt
        versionKey:false
    }
);

module.exports = mongoose.model("users", UserScheme)