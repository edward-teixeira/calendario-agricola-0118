const Plantacao = require('../models/plantacao');
const Colheita = require('../models/colheita');
const chalk = require('chalk');
const mongoose = require('mongoose');

exports.RemovePlantacaoCriaColheita = async ({_id, nome, tipoPlantio, dataInicio}) => {
    try {
        const novaColheita = await Colheita.create({nome, tipoPlantio, dataInicio});
        const removedPlantacao = await Plantacao.findOneAndRemove({'_id': _id});
        if(!novaColheita)
            return res.status(400).json({error: true, message: "Colheita nao existe"});
    } catch (e) {
        res.status(500).json({error: true, message: "Colheita nao encontrada"});
    }
};
// return res.json(400).json({error: true, message: "Impossivel criar a colheite"});

exports.ListaPlantacaoDaColheita = async(req, res, next) => {
    const exists = await Colheita.findById({"_id": req.params.id});
    if(!exists)
        return res.status(400).json({error: true, message: "Plantacao para a colheita nao existe"});
    return res.status(200).json({error: false, nome: exists.nome, tipoPlantio: exists.tipoPlantio, dataInicio: exists.dataIni})
};

exports.listaColheitas = async (req, res, next) => {

    try {
        const pageNo = parseInt(req.query.pageNo);
        const size = parseInt(req.query.size);
        const query ={};
        if(pageNo < 0 || pageNo === 0) {
            response = {error: true, message : "Numero de paginas invalido, deve começar com 1"};
            return res.status(400).json(response)
        }
        query.skip = size * (pageNo - 1);
        query.limit = size;
        const colheitas = await Colheita.find({},{}, query)
            .sort({date: -1})
            .exec(async function(err, data) {
                if(data) {
                    return res.status(200).json({error: false, data});
                } if(err)
                    return res.status(404).json({error: true, message: "Não existem colheitas"});
            });
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


