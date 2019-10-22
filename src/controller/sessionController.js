const User = require('../models/user');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

exports.sessionStore = async (req, res, next) => {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});

        if (!user) return res.status(401).json({error: 'User not found'});

        if(!(await user.comparePassword(password))) {
            return res.status(401).json({error: "Password inválido"});
        }
        const { id, name } = user;

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
    };

