const jwt = require('jsonwebtoken');

function generateToken (payload) {
    return jwt.sign(payload,process.env.JWT_SEED,{expiresIn:'1h'});
}

module.exports = {generateToken}