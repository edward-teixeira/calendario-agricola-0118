const fs = require('fs');
const mongoose = require('mongoose');
const chalk = require('chalk');

//Load models
const Plantacao = require('../src/models/plantacao');

//Connect to DB
mongoose.connect('mongodb://localhost:27017/calendario-agricola', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Read JSON files
const plantacoes = JSON.parse(
    fs.readFileSync(
    `${__dirname}/plantacao.json`, 'utf-8')
);

// Import into DB
const importData = async() => {
    try {
        await Plantacao.create(plantacoes);
        return console.log(chalk.green('Data Imported'))
    }catch(error) {
        return console.error(chalk.red('error ocurred'));
    }
};
// Delete data
// Import into DB
const deleteData = async() => {
    try {
        await Plantacao.deleteMany();
        return console.log(chalk.red('Data Destroyed'))
    }catch(error) {
        return console.error(chalk.green('Data deleted'));
    }
};

if(process.argv[2] === '-i') {
    importData();
}else if(process.argv[2] === '-d') {
    deleteData();
};
