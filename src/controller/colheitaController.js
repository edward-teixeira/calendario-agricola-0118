const Plantacao = require('../models/plantacao');
const Colheita = require('../models/colheita');
const chalk = require('chalk');

exports.RemovePlantacaoCriaColheita = async(data) => {
    try {
        const id = data._id;
        const removedPlantacao = await Plantacao.findOneAndRemove({'_id':id});
        const novaColheita = await Colheita.create()
            .exec(async function(err, novaColheita) {
            if(err)
                return res.json(400).json({error: true, message: "Impossivel criar a colheite"});

            novaColheita.plantacao = removedPlantacao;
            await novaColheita.save();
        });
        console.log(novaColheita);
        //const colheita = await Colheita.create({plantacao: change.fullDocument._id});
    } catch (e) {
        console.log();
    }
};
// return res.json(400).json({error: true, message: "Impossivel criar a colheite"});
