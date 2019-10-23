const User = require('../models/user');
const mongoose = require('mongoose');
const Yup = require('yup');
const chalk = require("chalk");
var ObjectId = mongoose.Schema.ObjectId;
//create, update, destroy
exports.list_user = async (req,res,next) => {
    try {
        const user = await User.find({}).exec();
        res.status(200).json(user);
    }catch(error) {
        res.status(500).send();
    }
};
exports.create_user = async (req, res) => {

    const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required().min(6)
    });
    try {
        if (!(await schema.isValid(req.body)))
            return res.status(400).json({error: 'Dados inválidos'})

        const {name, password, email} = req.body;
        const isFound = await User.exists({email: req.body.email});
        if (!isFound) {
            await User.create({name: name, password: password, email: email})
                .then(user => res.status(200).json({success: true, user}))
                .catch(err => res.status(500).json({
                    success: false,
                    message: "Ocorreu um erro ao salvar o documento"
                }));
        } else
            return res.status(400).json({
                success: true,
                message: "Email já está cadastrado"
            });
    } catch (e) {
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
            return res.status(400).json({error: 'Dados inválidos'})

        const {email, oldpassword, newpassword} = req.body;
        const reqID = mongoose.Types.ObjectId(req.userId);
        const user = await User.findById(reqID);
        console.log(user);
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
