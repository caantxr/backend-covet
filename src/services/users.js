/** El Archivo de Servicio tiene la responsabilidad única de hacer consultas a la base de datos */
const UserModel = require("../models/nosql/users");
const { encryptedPassword } = require("../utils/bcrypt");

const dbGetUser = async () => {
    return await UserModel.find();
}

const dbGetUserById = async (_id) => {
    return await UserModel.findOne({ _id });
}

const dbInsertUser = async (newUser) => {
    if (!newUser.email || newUser.email === '') {
        throw new Error('El email no puede estar vacío');
    }

    const dbUser = new UserModel(newUser);

    // Encriptar la contraseña
    const hashPassword = encryptedPassword(dbUser.password);
    dbUser.password = hashPassword;

    // Guardar el usuario en la base de datos
    const savedUser = await dbUser.save();

    // Eliminar la propiedad password antes de devolver el objeto
    const userWithoutPassword = savedUser.toObject();
    delete userWithoutPassword.password;
    delete userWithoutPassword.createdAt;
    delete userWithoutPassword.updatedAt;
    delete userWithoutPassword.__v;

    return userWithoutPassword;
}

const dbUpdateUser = async (id, updatedUser) => {
    const user = await UserModel.findByIdAndUpdate(id, updatedUser, { new: true });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    return user;
}

const dbDeleteUser = async (id) => {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    return user;
}

module.exports = {
    dbGetUser,
    dbGetUserById,
    dbInsertUser,
    dbUpdateUser,
    dbDeleteUser
};