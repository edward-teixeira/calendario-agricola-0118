const Plantacao = require('../models/plantacao');
const mongoose = require('mongoose');
const express = require("express");
const colheitaController = require('../controller/colheitaController');


//TODO( LISTAR TODAS - OK )
exports.listManyPlantacao = async(req, res, next) => {
    try{
       
        let helper = [];
        let newColheita = [];
        const todasAsPlantacoes = await Plantacao.find({ userId: req.user._id });
        
        for (let index = 0; index < todasAsPlantacoes.length; index++) {
            helper[index] = todasAsPlantacoes[index];
            console.log(helper[index]);
            if(!helper[index].prontoParaColheita) {
              newColheita.push(await Plantacao.findByIdAndUpdate(helper[index]._id, { prontoParaColheita: true }, {new: true }));
    
            }   
        }
        if(newColheita.length > 0 ) {
            for (let index = 0; index < newColheita.length; index++) {
                await colheitaController
                    .CriaColheita(req.user._id, newColheita[index]._id, newColheita[index].nome);
            }
        }
        
        if(todasAsPlantacoes) 
            return res.status(200).json(todasAsPlantacoes);
        
        return res.status(200).send({error: "Nehuma plantacao encontrada"});
        
    }catch(error) {
        console.log(error);
        res.status(500).json({error: "Nao foi possivel listar plantacoes"});
    }
};

exports.listOnePlantacao = async(req, res, next) => {
    
    try{
        const plantacao =  await Plantacao.findById(req.params.id);
        console.log(plantacao)
        // if(plantacao){
        //     if(!plantacao.podeColher)
        //          return res.status(200).json({error: true, plantacao});
        //     else {
        //        const teste =  await Plantacao.findByIdAndUpdate({'id': plantacao._id}, {prontoParaColheita: true }, {new: true });
        //        console.log(teste);
        //         await colheitaController
        //             .RemovePlantacaoCriaColheita(plantacao._id, plantacao.nome, plantacao.tipoPlantio, plantacao.dataInicio);
        //     }
        // }
        // return res.status(400).json({error: true, message: "Ocorreu um erro ao cirar uma colheita"});
        
    }catch(error) {
        console.log(error);
        res.status(500).json({error: error});
    }
};

//TODO(CRIAR - OK)
exports.create_plantacao = async (req, res, next) => {
    try {
        const { nome, tipo, sistema } = req.body
        const plantacao = await new Plantacao( { nome, tipoPlantio: tipo, sistemaPlantio: sistema, userId: req.user._id } );
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
