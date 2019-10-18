//Dependencias iniciais
require('./db/connect');
const express = require('express');
const cookieParser = require('./middleware/cookieParser');
const createError = require('http-errors');
const path = require('path');

//Sobe o servidor e abre a conexão com o banco
const app = express();



//Configuração de middlewares
app.use(require('./middleware/bodyParser').json());
app.use(require('./middleware/bodyParser').urlencoded({ extended: true }));
app.use(require('./middleware/logger'));
app.use(cookieParser());


//TODO(Adicionar todo as as rotas);
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/users'));
app.use('/user/plantacao', require('./routes/plantacaoRouter'));



//******************************************************** */
//! O codigo abaixo sera removido no futuro
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
//******************************************************** */
//Cuida das mensagens de errors do tipo 404
app.use(function(req, res, next) {
  next(createError(404));
});
// TODO(O codigo abaixo sera removido no futuro)
// Tratamento de erros
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
