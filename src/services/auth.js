const { usersModel } = require("../models")

const dbGetUserByEmail = async (email) => {
    return await usersModel.findOne({email})
}

const dbRegisterUser = async (newUser) => {
    const dbUser = new usersModel( newUser);

    dbUser.password = "12345"

    return await dbUser.save();
    
}

module.exports = {dbGetUserByEmail,dbRegisterUser}