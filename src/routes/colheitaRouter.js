const Colheita = require("../models/colheita");
const colheitaController = require('../controller/colheitaController');
const express = require('express');
const colheitaRouter = express.Router();

colheitaRouter.route('/')
    .get(colheitaController.listaColheitas);
colheitaRouter.route('/:id')
    .get(colheitaController.listaColheitaPorId)
    .put(colheitaController.updateColheita)
    .delete(colheitaController.deletaColheita);
colheitaRouter.route('/:id/plantacao')
    .get(colheitaController.ListaPlantacaoDaColheita);

module.exports = colheitaRouter;


