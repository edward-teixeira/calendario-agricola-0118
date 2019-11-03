const Anotacao = require('../models/anotacao');
const Plantacao = require('../models/plantacao');
//Criar = OK; Update: OK; ListarAll: OK; ListarPorID: Ok
//TODO(- Deletar; - Retornar todos ordedanos por data)

exports.criarAnotacao = async (req, res, next) => {

    try {
        const anotacao = await Anotacao.create(req.body);
        if(anotacao) {
           await Plantacao.findById(req.params.plantacaoId)
               .exec(function(err, plantacao) {
                  if(plantacao) {
                      plantacao.anotacao.push(anotacao);
                      plantacao.save();
                      return res.status(200).json({error: false, plantacao})
                  } else
                      return res.status(400).json({error: true, message: "Houve um erro ao criar a anotacao"});
               });
        }
        return res.status(400).json({error: true, message: "Houve um erro ao criar a anotacao"});
    }catch(error) {
        console.log(error);
        return res.status(500).json({error:'Houve um erro ao salvar os dados'});
    }
};

exports.listarTodasAnotacoes = async (req, res, next) => {
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

        const plantacoes = await Plantacao.findOne({"_id": req.params.plantacaoId},{}, query)
            .populate('anotacao')
            .sort({date: -1})
            .exec(async function(err, data) {
                if(data) {
                    anotacao = data.anotacao;
                    return res.status(200).json({error: false, anotacao});
                } else
                    res.status(400).json({error: true, message: "Não existem anotacoes para essa plantacao"});
            });

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
        //Checar se a anotacao existe
        const anotacaoRef = await Plantacao.findOne({"_id": req.params.plantacaoId})
            .populate('anotacao', '_id');

        if (anotacaoRef) {
            const anotacaoAtualizada = await Anotacao.findByIdAndUpdate(req.params.id, req.body, {new: true})
                .exec(function (err, data) {
                    if (err) return res.status(400).json({error: true, message: "Houve um erro ao processar a anotacao"});
                    return res.status(200).json({error: false, data});
                })
        } else
            return res.status(400).json({error:true, message:"Não foi possivel achar anotacoes para essa plantacao"});

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


