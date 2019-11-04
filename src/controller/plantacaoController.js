const Plantacao = require('../models/plantacao');
const mongoose = require('mongoose');
const express = require("express");
const colheitaController = require('../controller/colheitaController');


//@desc lista todas as plantacoes
//@route /user/plantacao
//@method get

exports.listManyPlantacao = async(req, res, next) => {
    try{
        const pageNo = parseInt(req.query.pageNo);
        const size = parseInt(req.query.size);
        const query ={};
        if(pageNo < 0 || pageNo === 0) {
            response = {error: true, message : "Numero de paginas invalido, deve começar com 1"};
            return res.status(400).json(response)
        }
        query.skip = size * (pageNo - 1);
        query.limit = size;
        const plantacoes = await Plantacao.find({},{},query, function(err, plantacoes) {
            if(plantacoes) return res.status(200).json({plantacoes});
            if(err) return res.status(400).json({error: "Você não tem plantações"});
        });
    }catch(error) {
        console.log(error);
        res.status(500).json({error: "Nao foi possivel listar plantacoes"});
    }
};
//@desc lista uma as plantacaos
//@route /user/plantacao/:id
//@method get

exports.listOnePlantacao = async(req, res, next) => {

    try{
        const plantacao =  await Plantacao.findById({"_id": req.params.id},async function(err, plantacao) {

            if(plantacao)  {
                const prontoParaColheita = plantacao.podeColher;
                if(prontoParaColheita) {
                    const updated = await Plantacao.findOneAndUpdate({"_id": req.params.id}, {prontoParaColheita: true}, {new: true},
                        async function(err, data) {
                            if(data) {
                                data.prontoParaColheita = true;
                                data.save();
                                await colheitaController.RemovePlantacaoCriaColheita(data);
                                return res.status(200).json({error: false, data});
                            }
                            if(err) {
                                res.status(500).json({error: true, message: "Ocorreu um erro ao cirar uma colheita"});
                            }
                        });
                    }
                }else
                    return res.status(200).json({error: true, message: "Plantacao nao encontrada"});
            if(err)
                return res.status(200).json({error: true,message: "Plantacao não encontrada"});
        });

    }catch(error) {
        res.status(500).json({error: error});
    }
};
//@desc cria uma plantacao plantacoes
//@route /user/plantacao
//@method post

exports.create_plantacao = async(req, res, next) => {
    try {
        const plantacao = await Plantacao.create(req.body);
        if(!plantacao)
            return res.status(400).json({error:true, message: 'Houve um erro ao salvar os dados'});
        return res.status(201).json({error: false, message: "Plantacao criada com sucesso"});
    }catch(error) {
        return res.status(500).json({error:false, message:'Houve um erro ao salvar os dados'});
    }
};
//@desc update uma plantacao plantacoes
//@route user/plantacao/:id
//@method put

exports.update_plantacao = async(req, res, next) => {
    try {
        const reqID = mongoose.Types.ObjectId(req.params.id.trim());
        const plantacao = await Plantacao.findById({'_id': reqID}); // Lembrar desse padrão
        if(!plantacao) res.status(400).json({error: false, message: 'Houve um erro ao salvar os dados'});

        const updated = await Plantacao
            .findByIdAndUpdate({'_id': reqID},req.body, {new: true});
        return res.status(200).json({error: false, message: "Plantacao Editada com sucesso",
            updated});
    } catch (error) {
        return res.status(500).json({error:'Houve um erro ao salvar os dados'});
    }
}

//@desc delete uma plantacao plantacoes
//@route /user/plantacao/:id
//@method delete
exports.delete_plantacao = async(req, res, next) => {
    try {
        const exists = await Plantacao.findById({'_id': req.params.id});
        if(!exists)
            res.status(400).json({error:true, message: 'Plantacao não existe'});

        const deleted = await Plantacao
            .findByIdAndRemove({'_id': req.params.id});
        return res.status(500)
            .json({error:false, message: 'plantacao removida com sucesso', deleted});

    } catch (e) {
        return res.status(500).json({error:'Houve um erro ao remover os dados'});
    }
};
