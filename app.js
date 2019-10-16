//Dependencias iniciais
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const bodyParser = require('body-parser');
const db_connect = require('./db/connect');

//Sobe o servidor
const app = express();
//Abre a conexão com o banco
db_connect();
/********************************************************/
//! O codigo abaixo sera removido no futuro
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
/******************************************************** */
//Configuração dos modulos importados no servidor

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/******************************************************* */
//TODO(Adicionar todoas as rotas);
//*Configuração de rotas
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/user/plantacao',require('./routes/plantacao'));

/********************************************************/
//Cuida das mensagens de errors do tipo 404
app.use(function(req, res, next) {
  next(createError(404));
});
//! O codigo abaixo sera removido no futuro
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //renderiza paginas de erro 
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
