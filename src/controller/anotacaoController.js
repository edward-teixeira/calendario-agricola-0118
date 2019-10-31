const Anotacao = require('../models/anotacao');
const Plantacao = require('../models/plantacao');
//Criar = OK; Update: OK; ListarAll: OK; ListarPorID: Ok
//TODO(- Deletar; - Retornar todos ordedanos por data)

exports.criarAnotacao = async (req, res, next) => {

    try {
        await Anotacao.create(req.body, async function(err, anotacao) {
            if(anotacao) {
                const plantacao = await Plantacao.findById({"_id": req.params.plantacaoId});
                if(plantacao) {
                    plantacao.anotacao = anotacao;
                    plantacao.save();
                    return res.status(200).json({plantacao});
                } else res.status(400).json({error: "Nao foi possivel salvar a anotacao para este documento"});

                return res.status(200).json({anotacao});
            }
        });
    }catch(error) {
        return res.status(500).json({error:'Houve um erro ao salvar os dados'});
    }
};

exports.listarAnotacao = async(req, res, next) => {
    try {
        const anotacaoRef = await Plantacao.findOne({"_id":req.params.plantacaoId})
            .populate('anotacao')
            .exec(function(err, plantacao){
                if(err)
                    return res.status(400).json({error: "Não foi possivel achar anotacoes para essa plantacao"});
                if(plantacao)
                    return res.status(200).json(plantacao.anotacao);
            });
    }catch(error) {
        return res.status(500).json({error:'Não foi possível listar anotacoes'});
    }
};

exports.atualizarAnotacao = async(req, res, next) => {
    try {
        //Checar se a anotacao existe
        const anotacaoRef = await Plantacao.findOne({"_id": req.params.plantacaoId})
            .populate('anotacao', '_id');

        if (anotacaoRef) {
            const anotacaoAtualizada = await Anotacao.findByIdAndUpdate(req.params.id, req.body, {new: true})
                .exec(function (err, data) {
                    if (err) return res.status(400).json({error: "Houve um erro ao processar a anotacao"});
                    return res.status(200).json({data});
                })
        } else
            return res.status(400).json({error: "Não foi possivel achar anotacoes para essa plantacao"});

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
                return res.status(201).json({message: "Anotacao removida com sucesso",anotacaoRemovida});
            }else
                return res.status(400).json({erro: "Nao foi possivel "});
        }catch(error) {
            console.log(error);
            return res.status(500).json({error:'Não foi possível atualizar a anotacao'});
        }
};


