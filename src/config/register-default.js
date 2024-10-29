const { encryptedPassword } = require("../utils/bcrypt");
const { usersModel } = require("../models/index");
const users = require( "./data" );


const createDefaultUsers = async () => {
    
    try {
        // Crea roles por defecto
        const registeredUsers = await Promise.all(
            users.map( async (userData) => {
                const userFound = await usersModel.findOne({ username: userData.username });

                if (!userFound) {
                    userData.password = encryptedPassword( userData.password );

                    const user = new usersModel( userData );
                    return user.save();
                }
                
                return null; // No guarda si el usuario ya existe
            })
        );

        // Filtra los valores nulos y muestra solo los usuarios que se han creado
        console.log("Usuarios creados:", registeredUsers.filter(Boolean));

    } catch (error) {
        console.error( error );
    }

}

module.exports = {
    createDefaultUsers
}