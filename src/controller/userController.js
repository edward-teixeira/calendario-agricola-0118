const User = require('../models/user');
const mongoose = require('mongoose');
const Yup = require('yup');
const chalk = require("chalk");
const jwt = require('jsonwebtoken');
const authConfig =  require('../config/auth');

exports.list_user = async (req,res,next) => {
    try {
        const user = await User.find({}).exec();
        res.status(200).json(user);
    }catch(error) {
        res.status(500).send();
    }
};

exports.logar_user = async ( req, res ) => {
    const {email, password} = req.body;

    if (!email || !password) return res.status(422).send({error: "Senha e email devem ser fornecidos"});

    const user = await User.findOne({email});

    if (!user) return res.status(400).send({error: "Usuario não cadastrado"});

    try {
        await user.comparePassword(password);
        //Gerar um novo token para o usuário
        const token = jwt.sign({ userId: user._id }, authConfig.secret);
        res.send({token});
    } catch (e) {
        return res.status(422).send({error: "Senha ou email inválidos"});
    }

};

exports.logout_user = async ( req, res ) => {
    var session = req.session.user;
    if(session) {
        req.session.user = null;
        return res.status(200).json({error: false, message: "Usuario deslogado com sucesso"});
    }
    return res.status(400).json({error: true, message: "Houve um erro ao lugar o usuário"});
};

//TODO(CREATE_USER_VALIDADO = OK)
exports.create_user = async (req, res) => {

    const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().required(),
        password: Yup.string().required().min(6)
    });
    try {
        if (!(await schema.isValid(req.body)))
            return res.status(400).json({error: 'Dados inválidos'});

        const {name, password, email} = req.body;
        const isFound = await User.exists({email: req.body.email});

        if (!isFound) {
            const user = await new User({ name: name, password: password, email: email });
            if(user) {
                user.save();
                const token = jwt.sign({userId: user._id}, authConfig.secret);
                return res.status(200).json({success: true, user, token});
            }
        } else
            return res.status(200).json({
                success: false,
                message: "Email já está cadastrado"
            });
    } catch (e) {
        console.log(e);
        res.status(500).json({error: 'Ocorreu um erro desconhecido'});
    }
};

exports.update_user = async (req, res) => {
    const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string(),
        oldpassword: Yup.string().min(6),
        newpassword: Yup.string().min(6)
            .when('oldpassword', (oldpassword, field) =>
                oldpassword ?field.required(): field
            ),
        confirmpassword: Yup.string()
            .when('newpassword', (newpassword, field) =>
                newpassword ?
                    field.required().oneOf([Yup.ref('newpassword')]) : field
            )
    });

    try {
        if (!(await schema.isValid(req.body)))
            return res.status(400).json({error: 'Dados inválidos'});

        const {email, oldpassword, newpassword} = req.body;
        const reqID = mongoose.Types.ObjectId(req.userId);
        const user = await User.findById(reqID);
        //Se algum usuário já possui o mesmo email
        if (email !== user.email) {
            const userExists = await User.findOne({email: email});
            if (userExists) return res.status(400).json({error: 'Usuário já existe'});
        }
        //Se as senhas n correspondem
        if (oldpassword && !(await user.comparePassword(oldpassword))) {
            console.log('here');
            return res.status(401).json({error: 'Password inválido'})
        }
        const updatedUser = await User.findByIdAndUpdate({_id: user.id}, req.body, {new: true}, function(err, user) {
            if(err) console.log(err);
            else {
                user.password = newpassword;
                user.save(function(err, user) {
                    if(err) console.log(err);
                    else
                        console.log(chalk.green('ok'));
                });
            }
        });
        console.log('***************' + user.id);
        res.status(200).json({message: 'ok', updatedUser});
    }catch(err) {
        res.status(500).json({message: err.toString()});
    }
};

exports.delete_user = async (req, res) => {
    try {
        const reqID = mongoose.Types.ObjectId(req.userId);
        const isFound = await User.exists(reqID);
        if(!isFound) return res.status(400).json({error: 'Usuario não existe'});
        await User.findByIdAndDelete(reqID, function(err, user) {
            if(err) return res.status(500).json({error: 'Erro ao deletar usuario'});
            else {
                return res.status(203).json({message: 'Usuario removido com sucesso'});
            }
        });
    }catch(error) {
        return res.status(500).json({error: 'Ocorreu um erro ao processar os dados'});
    }
};
