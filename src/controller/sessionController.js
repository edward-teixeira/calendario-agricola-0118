const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const Yup = require('yup');

exports.sessionStore = async (req, res, next) => {

    const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().required(),
        password: Yup.string().required()
    });

    try {
        if (!(await schema.isValid(req.body)))
            return res.status(400).json({error: 'Dados inválidos'});

        const {email, password} = req.body;
        const user = await User.findOne({email: email});

        if (!user) return res.status(401).json({error: 'User not found'});

        if (!(await user.comparePassword(password))) {
            return res.status(401).json({error: "Password inválido"});
        }
        const {id, name} = user;

        return res.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign(
                {id},
                authConfig.secret,
                {expiresIn: authConfig.expiresIn}
            )
        });
    } catch (e) {
        res.status(500).json({error: 'Ocorreu um erro desconhecido'});
    }
};

