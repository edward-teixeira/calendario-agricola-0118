const Plantacao = require('../models/plantacao');
const Colheita = require('../models/colheita');
const chalk = require('chalk');
const mongoose = require('mongoose');

exports.CriaColheita = async (user_id, _id, nome) => {
    try {
        const novaColheita = await Colheita.create({'userId': user_id, 'plantacaoId': _id, 'nome': nome });
    } catch (e) {
        console.log(e);
    }
};

exports.ListaPlantacaoDaColheita = async(req, res, next) => {
    const exists = await Colheita.findById({"_id": req.params.id});
    if(!exists)
        return res.status(400).json({error: true, message: "Plantacao para a colheita nao existe"});
    return res.status(200).json({error: false, nome: exists.nome, tipoPlantio: exists.tipoPlantio, dataInicio: exists.dataIni})
};

exports.listaColheitas = async (req, res, next) => {

    try {
        const colheitas = await Colheita.find({userId: req.user._id})
        console.log("**Servidor**\n" + colheitas);
        if(colheitas)
            return res.status(200).json(colheitas);

        return res.status(404).json({error: true, message: "Não existem colheitas"});
    }catch (e) {
        res.status(500).json({error: true, message: "Nao foi possivel listar colheitas"});
    }

};

exports.listaColheitaPorId = async (req, res, next ) => {

    try {
        const exists = await Colheita.exists({"_id": req.params.id});
        if(!exists) return res.status(400).json({error: true, message: "Colheita nao existe"});

        const colheita = await Colheita.findById({"_id": req.params.id}, function(err, data) {
            if(err)
                return res.status(400).json({error: true, message: "Nao foi possivel encontrar a data"});
            else
                return res.status(201).json({error: false, colheita: data});
        });
    }catch(e) {
        res.status(500).json({error: true, message: "Colheita nao encontrada"})
    }
};

exports.updateColheita = async (req, res, next) => {
    try {
        const reqID = mongoose.Types.ObjectId(req.params.id.trim());
        const exists = await Colheita.exists(reqID);
        if(!exists) return res.status(400).json({error: true, message: "Colheita nao existe"});

        const updatedColheita = await Colheita.findByIdAndUpdate({'_id': reqID}, req.body,{new: true});
        if(updatedColheita)
            return res.status(201).json({error: false, updatedColheita});
        else
            return res.status(400).json({error: true, message: "Não foi possivel alterar a colheita"});
    }catch(e) {
        console.log(chalk.redBright(e));
        res.status(500).json({error: true, message: "Colheita nao encontrada"});
    }
};

exports.deletaColheita = async (req, res, next) => {

    try {
        const exists = await Colheita.exists({"_id": req.params.id });
        if(!exists) return res.status(404).json({error: true, message: "Colheita nao existe"});

        const deletedColheita = Colheita.findOneAndDelete({"_id": req.params.id})
            .exec(function( err, deleted) {
                if(err) res.status(400).json({errro: true, message: "Nao foi possível deletar a colheita"});
                res.status(201).json({error: false, message: "Colheita deletada com sucesso"});
            });

    }catch(e) {
        res.status(500).json({error: true, message: "Colheita nao encontrada"});
    }

};


