const { dbGetUserByEmail, dbRegisterUser } = require("../services/auth");
const { verifyEncriptedPassword } = require("../utils/bcrypt");
const { removePropertyUsers } = require("../utils/json-filter");
const { generateToken } = require("../utils/jwt");

async function register (req,res){
    const inputData = req.body;
    try {
        const userFound = await dbGetUserByEmail (inputData.email)
        if (userFound){
            return res.json({
                ok:false,
                msg:"El usuario ya existe."
            });
        }

        const data = await dbRegisterUser(inputData);
        res.json({
            message: "registra usuario", data
        })
    } catch (error) {
        console.error(error)
        res.json({
            msg: "ocurrio un error"
        })
    }

    
}

async function login (req,res){
    const inputData = req.body;
    try {
        const userFound = await dbGetUserByEmail (inputData.email)
        if (!userFound) {
            return res.json({
                ok:false,
                msg:"El usuario no existe, por favor registrese"
            });
        }
        const isValidPassword = verifyEncriptedPassword (inputData.password,userFound.password)
        if (!isValidPassword) {
            return res.json({
                ok:false,
                msg:"La contraseña es invalida"
            })   
        }

        const payload = {
            email: userFound.email,
            role: userFound.role,
            name: userFound.name,
            id: userFound._id
        }
        const token = generateToken (payload)

        const userData = removePropertyUsers(userFound)
        res.json({
            ok : true,
            token,
            data: userData
        })
    } catch (error) {
        console.error(error)
        res.json({
            msg: "Error de inicio de sesion" 
        })
    }
}
module.exports = {register,login}