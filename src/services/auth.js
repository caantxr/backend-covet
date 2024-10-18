const { usersModel } = require("../models");
const { encryptedPassword } = require("../utils/bcrypt");

const dbGetUserByEmail = async (email) => {
    return await usersModel.findOne({email})
}

const dbRegisterUser = async (newUser) => {
    const dbUser = new usersModel( newUser);

    dbUser.password = encryptedPassword (dbUser.password);

    const bjsonUser = await dbUser.save();
    const dataUser = bjsonUser.toObject();

    delete dataUser.password;
    delete dataUser.createdAt;
    delete dataUser.updatedAt;

    return dataUser;
}

module.exports = {dbGetUserByEmail,dbRegisterUser}