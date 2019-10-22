const jwt = require('jsonwebtoken');
const authConfig =  require('../config/auth');
const promisify = require('util');

exports.authHeader = async function (req, res, next)  {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader) return res.status(401).json({error: 'Erro ao processar o Token'});
        console.log(authHeader);
        const [bearer, token] = authHeader.split(' ');

        jwt.verify(token, authConfig.secret, function(err, decoded) {
            if (!err){
                req.userId = decoded.id;
                return next();
            }
            return res.status(500).json({error: "Ocorreu um erro inesperado"});

        });

    }catch (e) {
        return res.status(401).json({error: 'Token inválido'});
    }
};
