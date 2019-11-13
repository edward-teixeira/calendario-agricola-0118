const jwt = require('jsonwebtoken');
const authConfig =  require('../config/auth');
const promisify = require('util');
const User = require('../models/user');

exports.authHeader = async function (req, res, next)  {
    try {
        //Extrai o token de autenticação da requisição
        const authHeader = req.headers.authorization;
        //Caso a requisição não possua um token, envia um erro como resposta
        if(!authHeader) return res.status(401).json({error: 'Voce deve estar logado'});
        //O token é anexado na requisição como "Bearer ${token}....
        const [bearer, token] = authHeader.split(' ');

        //Chama uma função jwt para verificar a antenticidade do usuário
        jwt.verify(token, authConfig.secret, async function (err, payload) {
            if (!err){
                const { userId } = payload;
                const user = await User.findById(userId);
                req.user = user;
                //Retorna para o proximo middleware caso o usuario esteja correto
                return next();
            }
            //Retorna um erro caso o usuário possua um token inválido
            return res.status(401).json({error: "Voce deve estar logado"});
        });
    }catch (e) {
        //Erro do servidor
        return res.status(401).json({error: 'Token inválido'});
    }
};
