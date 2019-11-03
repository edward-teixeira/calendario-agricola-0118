/*
const socket_io = require('socket.io');
const Plantacao = require('../models/plantacao');
const Colheita = require('../models/colheita');
const chalk = require('chalk');

const io = socket_io();
const changeStream = Plantacao.watch();
changeStream.on('change', async(change) => {
    if(change.operationType.toString() === 'update') {
        console.log(chalk.yellowBright("Aqui"));
        try {
            const id = change.documentKey._id;
            const removedPlantacao = await Plantacao.findOneAndRemove({'_id':change.documentKey._id});
            const novaColheita = await Colheita.create();
            novaColheita.plantacao = removedPlantacao;
            await novaColheita.save(function(err, colheita) {
                if(err) return res.json(400).json({error: true, message: "Impossivel criar a colheite"});
                this.colheita.push(removedPlantacao);
            });
            console.log(novaColheita);
            //const colheita = await Colheita.create({plantacao: change.fullDocument._id});
        } catch (e) {
            console.log();
        }
        //console.log(colheita);
    }
    // You could parse out the needed info and send only that data.*!/
    io.emit('changeData', change);
});
io.on('connection', function () {
    console.log('connected');
});
var socket = io;

module.exports = socket;
*/
