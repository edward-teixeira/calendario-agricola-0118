//Dependencias iniciais
require('./db/connect');
const express = require('express');
const cookieParser = require('./middleware/cookieParser');
const createError = require('http-errors');
const path = require('path');
const userController = require('./controller/userController');
const authMiddleware = require('./middleware/auth');

//Sobe o servidor e abre a conexão com o banco
const app = express();

//Configuração de middlewares
app.use(require('./middleware/bodyParser').json());
app.use(require('./middleware/bodyParser').urlencoded({ extended: true }));
app.use(require('./middleware/logger'));
app.use(cookieParser());

//Home page
app.use('/', require('./routes/index'));
//Create user
app.post('/user', userController.create_user);
//Rota para login
app.use('/sessions', require('./routes/sessionRouter'));
//Global Middlware
app.use(authMiddleware.authHeader);
//Update user
app.put('/user', userController.update_user);
app.use('/user/plantacao', require('./routes/plantacaoRouter'));

module.exports = app;
