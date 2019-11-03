const Colheita = require("../models/colheita");
const express = require('express');
const colheitaRouter = express.Router();

colheitaRouter.route('/')
    .get(function(req, res) {
        console.log("Listar toda a colheita");
});

module.exports = colheitaRouter;


