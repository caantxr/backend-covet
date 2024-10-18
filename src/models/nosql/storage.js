const { MongoOIDCError } = require("mongodb")
const mongoose = require("mongoose")

const StorageScheme = new mongoose.Schema(
    {
        url:{
            type:String
        },
        filename:{
            type:String
        },
    },
    {
        timestamps:true,  //TODO createAt, updatedAt
        versionKey:false
    }
);

module.exports = mongoose.model("storages", StorageScheme)