const { MongoOIDCError } = require("mongodb")
const mongoose = require("mongoose")

const UserScheme = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        age:{
            type:Number,
            min: 0,
        },
        email:{
            type:String,
            unique:true,
            required:true,
            match: /.+\@.+\..+/ 
        },
        password:{
            type:String,
            required: true,
            minlenght: 8,
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