const plantacaoController = require('../controller/plantacaoController');
const express = require('express');
var  anotacaoRouter = express.Router({mergeParams: true});
const anotacaoController = require('../controller/anotacaoController');

const plantacaoRouter = require('express').Router();
plantacaoRouter.use('/:plantacaoId/anotacao', anotacaoRouter);

plantacaoRouter.route('/')
    .get(plantacaoController.listManyPlantacao)
    .post(plantacaoController.create_plantacao);

plantacaoRouter.route('/:id')
    .get(plantacaoController.listOnePlantacao)
    .put(plantacaoController.update_plantacao)
    .delete(plantacaoController.delete_plantacao);

anotacaoRouter.route('/')
    .post(anotacaoController.criarAnotacao);


module.exports = plantacaoRouter;
