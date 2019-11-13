 const mongoose = require('mongoose');
 const chalk = require('chalk');
 const URL = require('./key');

const connect = () => {
 return mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
};
connect()
  .then(async connection => {
    console.log(chalk.grey.bgGreen.bold('LOG: DATABASE CONNECTED SUCCESFULLY'));
  })
  .catch(error => console.error(chalk.grey.bgRed.bold('LOG' + error)));

  module.exports = connect;
