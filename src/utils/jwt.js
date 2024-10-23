const jwt = require('jsonwebtoken');

function generateToken (payload) {
    return jwt.sign(payload,process.env.JWT_SEED,{expiresIn:'1h'});
}
function verifyToken ( token ) {
    return jwt.verify( 
        token,                      // Token valido 
        process.env.JWT_SEED        // Seed: Palabra Secreta (Semilla) 
    );
}

module.exports = {generateToken, verifyToken}