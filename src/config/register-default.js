const { encryptedPassword } = require("../utils/bcrypt");
const { usersModel, categoryModel } = require("../models/index");
const {users,categories} = require( "./data" );


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
const createDefaultCategories = async () => {
    
    try {
        // Crea roles por defecto
        const registeredCategories = await Promise.all(
            categories.map( async (categoryData) => {
                const categoryFound = await categoryModel.findOne({ name: categoryData.name });

                if (!categoryFound) {
                    const category = new categoryModel( categoryData );
                    return category.save();
                }
                
                return null; // No guarda si el usuario ya existe
            })
        );

        // Filtra los valores nulos y muestra solo los usuarios que se han creado
        console.log("Usuarios creados:", registeredCategories.filter(Boolean));

    } catch (error) {
        console.error( error );
    }

}
module.exports = {
    createDefaultUsers, createDefaultCategories
}