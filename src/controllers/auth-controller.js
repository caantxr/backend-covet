const { dbGetUserByEmail, dbRegisterUser } = require("../services/auth");
const { verifyEncriptedPassword } = require("../utils/bcrypt");
const { removePropertyUsers } = require("../utils/json-filter");
const { generateToken } = require("../utils/jwt");

async function register (req,res){
    const inputData = req.body;

    console.log( inputData );
    
    if (!inputData.email || !inputData.email.includes('@')) {
        return res.json({
            ok: false,
            msg: 'El correo electrónico proporcionado no es válido.'
        });
    }

    
    
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

function reNewToken( req, res ) {
    // Paso 1: Obtener el payload del objeto Request
    const payload = req.authUser;

    // Paso 2: Genera nuevo Token con payload del Token anterior
    const newToken = generateToken( payload );

    // Paso 3: Envia el Token al cliente
    res.json({
        ok: true,
        token: newToken
    });
}

module.exports = {register,login,reNewToken}