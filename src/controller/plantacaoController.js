const Plantacao = require('../models/plantacao');
const mongoose = require('mongoose');

//@desc lista todas as plantacoes
//@route /user/plantacao
//@method get

exports.listManyPlantacao = async(req, res, next) => {
  res.status(200).json({success: true,
        message: 'Lista todas as plantacoes'})
};
//@desc lista uma as plantacaos
//@route /user/plantacao/:id
//@method get

exports.listOnePlantacao = async(req, res, next) => {
  res.status(200).json({success: true,
    message: `Lista uma plantacao de id: ${req.params.id}`})
};
//@desc cria uma plantacao plantacoes
//@route /user/plantacao
//@method post

exports.create_plantacao = async(req, res, next) => {
  try {
   const plantacao = await Plantacao.create(req.body);
   if(!plantacao)
     return res.status(400).json({error:'Houve um erro ao salvar os dados'});

    return res.status(201).json({message: "Plantacao criada com sucesso"});
  }catch(error) {
    return res.status(500).json({error:'Houve um erro ao salvar os dados'});
  }
};
//@desc update uma plantacao plantacoes
//@route user/plantacao/:id
//@method put

exports.update_plantacao = async(req, res, next) => {
    try {
        const reqID = mongoose.Types.ObjectId(req.params.id.trim());
        const plantacao = await Plantacao.findById({'_id': reqID}); // Lembrar desse padrão
        if(!plantacao) res.status(400).json({error:'Houve um erro ao salvar os dados'});

        const updated = await Plantacao
            .findByIdAndUpdate({'_id': reqID},req.body, {new: true});
        return res.status(200).json({message: "Plantacao Editada com sucesso",
            updated});
    } catch (error) {
        return res.status(500).json({error:'Houve um erro ao salvar os dados'});
    }
};

//@desc delete uma plantacao plantacoes
//@route /user/plantacao/:id
//@method delete
exports.delete_plantacao = async(req, res, next) => {
    try {
        const exists = await Plantacao.findById({'_id': req.params.id});
        if(!exists)
            res.status(400).json({error:'Plantacao não existe'});

        const deleted = await Plantacao
            .findByIdAndRemove({'_id': req.params.id});
        return res.status(500)
            .json({message: 'plantacao removida com sucesso', deleted});

    } catch (e) {
        return res.status(500).json({error:'Houve um erro ao remover os dados'});
    }
};
