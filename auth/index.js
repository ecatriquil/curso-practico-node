const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret);
}


function verify(token) {
    return jwt.verify(token, secret);
}

const check = {
    own: function (req, owner) {
        //comprobacion
        //decodificar el token
        const decoded = decodeHeader(req);
        //comprobar si es o no propio
        if (decoded.id !== owner) {
            throw error('No puedes hacer esto', 401);
        }
    },
    logged: function (req) {
        //decodificar el token
        const decoded = decodeHeader(req);
        //comprobar si es o no propio
    }
}


function getToken(authorization) {
    //Bearer | token
    if (!authorization) {
        throw new Error('No viene token');
    }

    if (authorization.indexOf('Bearer ') === -1) {
        throw new Error('Formato invalido')
    }

    let token = authorization.replace('Bearer ', '');

    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;

}

module.exports = {
    sign,
    check
}