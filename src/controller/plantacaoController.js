const Plantacao = require('../models/plantacao');
const mongoose = require('mongoose');
const express = require("express");
const colheitaController = require('../controller/colheitaController');


//TODO( LISTAR TODAS - OK )
exports.listManyPlantacao = async(req, res, next) => {
    try{
        console.log(req.user._id);
        const todasAsPlantacoes = await Plantacao.find({ userId: req.user._id });
       /* const pageNo = parseInt(req.query.pageNo);
        const size = parseInt(req.query.size);
        const query ={};
        if(pageNo < 0 || pageNo === 0) {
            response = {error: true, message : "Numero de paginas invalido, deve começar com 1"};
            return res.status(400).json(response)
        }
        query.skip = size * (pageNo - 1);
        query.limit = size;*/
        /*const plantacoes = await Plantacao.find({},{},query, function(err, plantacoes) {
            if(plantacoes) return res.status(200).json({plantacoes});
            if(err) return res.status(400).json({error: "Você não tem plantações"});
        });*/

        if(todasAsPlantacoes) return res.status(200).json(todasAsPlantacoes);
        res.status(200).send({error: "Nehuma plantacao encontrada"});

    }catch(error) {
        console.log(error);
        res.status(500).json({error: "Nao foi possivel listar plantacoes"});
    }
};

exports.listOnePlantacao = async(req, res, next) => {

    try{
        const plantacao =  await Plantacao.findById({"_id": req.params.id, userId: req.user._id},async function(err, plantacao) {

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

//TODO(CRIAR - OK)
exports.create_plantacao = async (req, res, next) => {
    try {
        const plantacao = await new Plantacao( { ...req.body, userId: req.user._id } );
        await plantacao.save();
        return res.status(201).json({error: false, message: "Plantacao criada com sucesso"});
    }catch(error) {
        console.log(error);
        return res.status(500).json({error:false, message:'Houve um erro ao salvar os dados'});
    }
};

//TODO( UPDATE PLANTACAO - OK)
exports.update_plantacao = async(req, res, next) => {
    try {
        const reqID = mongoose.Types.ObjectId(req.params.id.trim());
        const plantacoesUsuario = await Plantacao.find( { userId: req.user._id });
        const plantacao = await Plantacao.findById({'_id': reqID}); // Lembrar desse padrão
        if(!plantacao) res.status(400).json({error: false, message: 'Houve um erro ao salvar os dados'});

        const updated = await Plantacao
            .findByIdAndUpdate({'_id': reqID},req.body, {new: true});
        return res.status(200).json({error: false, message: "Plantacao Editada com sucesso",
            updated});
    } catch (error) {
        return res.status(500).json({error:'Houve um erro ao salvar os dados'});
    }
};

//TODO(DELETAR - OK)
exports.delete_plantacao = async(req, res, next) => {
    try {
        console.log(req.user._id);
        const plantacoesDoUsuario = await Plantacao.find({ userId: req.user._id });
        if(plantacoesDoUsuario) {
            await Plantacao.findOneAndRemove({ id: plantacoesDoUsuario._id });
            return res.status(200).json({error: false, message: "Plantacao deletada com sucesso" });
        }
        return res.status(200).json({error: true, message: "Não foi possivel deletar a plantação" });

    } catch (e) {
        return res.status(500).json({error:'Houve um erro ao remover os dados'});
    }
};
