const Anotacao = require('../models/anotacao');
const Plantacao = require('../models/plantacao');

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
           if(err) return res.status(400).json({error: "Houve um erro ao criar  anotacao"});
       });
   }catch(error) {
       return res.status(500).json({error:'Houve um erro ao salvar os dados'});
   }
};

