const plantacao = require('../models/plantacao');

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
  res.status(200).json({success: true,
    message: 'Cria uma plantacao'})
};
//@desc update uma plantacao plantacoes
//@route user/plantacao/:id
//@method put
exports.put_plantacao = async(req, res, next) => {
  res.status(200).json({success: true,
    message: `Update na plantacao:${req.params.id}`})
};
//@desc delete uma plantacao plantacoes
//@route /user/plantacao/:id
//@method delete

exports.delete_plantacao = async(req, res, next) => {
  res.status(200).json({success: true,
    message: `Delete na plantacao:${req.params.id}`})
};
