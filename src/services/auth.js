const { usersModel } = require("../models");
const { encryptedPassword } = require("../utils/bcrypt");

const dbGetUserByEmail = async (email) => {
    return await usersModel.findOne({email})
}

const dbRegisterUser = async (newUser) => {
    const dbUser = new usersModel( newUser);

    dbUser.password = encryptedPassword (dbUser.password);

    return await dbUser.save();
    
}

module.exports = {dbGetUserByEmail,dbRegisterUser}