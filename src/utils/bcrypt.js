const bcrypt =require('bcrypt');

const encryptedPassword = ( pass ) => {
    const salt = bcrypt.genSaltSync();
    console.log(salt)

    const hashPassword = bcrypt.hashSync(pass,salt);
    console.log(hashPassword)

    return hashPassword;
}

const verifyEncriptedPassword = (pass, hashPassword) => {
    return bcrypt.compareSync(pass,hashPassword);
}

module.exports = {encryptedPassword,verifyEncriptedPassword}