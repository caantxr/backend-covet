const { usersModel } = require("../models");
const { encryptedPassword } = require("../utils/bcrypt");
const { removePropertyUsers } = require("../utils/json-filter");

const dbGetUserByEmail = async (email) => {
    return await usersModel.findOne({email})
}

const dbRegisterUser = async (newUser) => {
    const dbUser = new usersModel( newUser);

    dbUser.password = encryptedPassword (dbUser.password);

    const bjsonUser = await dbUser.save();
    
    return removePropertyUsers(bjsonUser);

}

module.exports = {dbGetUserByEmail,dbRegisterUser}