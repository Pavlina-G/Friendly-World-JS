require('dotenv').config();
const jwt = require('jsonwebtoken');


function createToken(user) {
    const payload = {
        _id: user._id,
        email: user.email
    };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: '2d'});
    
    return token;
}

function verifyToken(token) {
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    return payload;
}

module.exports = {
    createToken,
    verifyToken
};
