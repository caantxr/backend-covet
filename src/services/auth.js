const { usersModel, businessModel } = require("../models");
const business = require("../models/nosql/business");
const { encryptedPassword } = require("../utils/bcrypt");
const { removePropertyUsers } = require("../utils/json-filter");

const dbGetUserByEmail = async (email) => {
    return await usersModel.findOne({email})
}

const dbRegisterUser = async (newUser) => {
    const dbUser = new usersModel( newUser);

    dbUser.password = encryptedPassword (dbUser.password);

    // return await dbUser.save();
    const bjsonUser = await dbUser.save();
    
    return removePropertyUsers(bjsonUser);

}

const dbRegisterBusinessOwner = async ( newUser, newBusiness ) => {
    const dbUser = new usersModel( newUser);
    const dbBusiness = new businessModel( newBusiness );

    dbUser.password = encryptedPassword (dbUser.password);
    dbBusiness.owner = dbUser._id;

    console.log( dbUser, dbBusiness );

    const data = await Promise.all([
        dbUser.save(),
        dbBusiness.save()
    ]);

    console.log( data );
    return {
        user:data[0],
        business :data[1]
    };
}

module.exports = {dbGetUserByEmail,dbRegisterUser,dbRegisterBusinessOwner}