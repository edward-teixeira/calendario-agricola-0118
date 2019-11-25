const Anotacao = require('../models/anotacao');
const Plantacao = require('../models/plantacao');
const mongoose = require('mongoose');
//Criar = OK; Update: OK; ListarAll: OK; ListarPorID: Ok
//TODO(- Deletar; - Retornar todos ordedanos por data)

exports.criarAnotacao = async (req, res, next) => {

    try {
        console.log(req.body);
        const anotacaoNova = await new Anotacao ({ titulo: req.body.Titulo, descricao: req.body.Descricao });
        await anotacaoNova.save();
        if(anotacaoNova) {
            const plantacaoByID = await Plantacao.findOne({"_id": req.params.plantacaoId})
            plantacaoByID.anotacao.push(anotacaoNova);
            await plantacaoByID.save();
            return res.status(200).json({error: false, message: "Anotacao criada com sucesso"});
        }   
        return res.status(400).json({error: true, message: "Houve um erro ao criar a anotacao"});
    }catch(error) {
        console.log(error);
        return res.status(500).json({error:'Houve um erro ao salvar os dados'});
    }
};

exports.listarTodasAnotacoes = async (req, res, next) => {
    try {
        // const pageNo = parseInt(req.query.pageNo);
        // const size = parseInt(req.query.size);
        // const query ={};
        // if(pageNo < 0 || pageNo === 0) {
        //     response = {error: true, message : "Numero de paginas invalido, deve começar com 1"};
        //     return res.status(400).json(response)
        // }
        // query.skip = size * (pageNo - 1);
        // query.limit = size;
       
        const plantacoes = await Plantacao.findById(req.params.plantacaoId);
        let anotacoesID = [];
        let anotacoes = [];
        for( let i = 0 ; i < plantacoes.anotacao.length; i++) {
             anotacoesID.push(plantacoes.anotacao[i]);
        }

        if(anotacoesID.length >= 1 && anotacoesID !== null && anotacoesID !== 'undefined') {
            
            for (const id of anotacoesID) {
                temp = await Anotacao.findById(id);
                if(temp) anotacoes.push(temp);
            }
            return res.status(200).json({error: false, anotacoes: anotacoes});
        } else 
             return res.status(400).json({error: true, message: "Não existem anotacoes para essa plantacao"});

    }catch(error) {
        res.status(500).json({error: "Não foi possível realizar a pesquisa"})
    }
}

exports.listarAnotacao = async(req, res, next) => {
    try {
        const anotacaoRef = await Plantacao.findOne({"_id":req.params.plantacaoId})
            .populate('anotacao')
            .exec(function(err, plantacao){
                if(err)
                    return res.status(400).json({error: true, message: "Não foi possivel achar anotacoes para essa plantacao"});
                if(plantacao)
                    return res.status(200).json({error: false, data: plantacao.anotacao});
                else
                    return res.status(400).json({error: true, message: "Não foi possivel achar anotacoes para essa plantacao"});
            });
        return res.status(410).json({error: true, message: "Não foi possivel achar anotacoes para essa plantacao"});
    }catch(error) {
        return res.status(500).json({error:'Não foi possível listar anotacoes'});
    }
};

exports.atualizarAnotacao = async(req, res, next) => {
    try {

        const anotacaoAtualizada = await Anotacao.findByIdAndUpdate(req.params.plantacaoId, req.body, {new: true } );
        if(anotacaoAtualizada) 
            return res.status(200).json({error:false, message:"Anotacao Atualizada com Sucesso"});

        return res.status(400).json({error:true, message:"Houve um erro ao atualizar anotacao"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Não foi possível atualizar a anotacao'});
    }
};

exports.deletarAnotacao = async ( req, res, next) => {
        try {
            const anotacaoRef = await Plantacao.findById(req.params.plantacaoId)
                .populate('anotacao', "_id")
                .exec();
            if(anotacaoRef){
                const anotacaoRemovida = await Anotacao.findOneAndDelete({"_id": req.params.id});
                return res.status(201).json({error: true, message: "Anotacao removida com sucesso",anotacaoRemovida});
            }else
                return res.status(400).json({error: true, message: "Nao foi possivel "});
        }catch(error) {
            return res.status(500).json({error:'Não foi possível atualizar a anotacao'});
        }
};


