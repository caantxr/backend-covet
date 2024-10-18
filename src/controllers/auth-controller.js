const { dbGetUserByEmail, dbRegisterUser } = require("../services/auth");

async function register (req,res){
    const inputData =req.body;
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
            message: "ocurrio un error"
        })
    }

    
}
module.exports = {register}