//Dependencias iniciais
require('./src/db/connect');
const express = require('express');
const cookieParser = require('./src/middleware/cookieParser');
const createError = require('http-errors');
const path = require('path');
const userController = require('./src/controller/userController');
const authMiddleware = require('./src/middleware/auth');

//Sobe o servidor e abre a conexão com o banco
const app = express();

//Configuração de middlewares
app.use(require('./src/middleware/bodyParser').json());
app.use(require('./src/middleware/bodyParser').urlencoded({ extended: true }));
app.use(require('./src/middleware/logger'));
app.use(cookieParser());

//Home
//TODO(Isso será movido daqui, porque necessita de autenticação de usuario)
app.use('/', require('./src/routes/index'));
//Create user
app.post('/user', userController.create_user);
//Rota para login
app.use('/sessions', require('./src/routes/sessionRouter'));
//Global Middlware
app.use(authMiddleware.authHeader);
//Update user
app.put('/user', userController.update_user);
app.use('/user/plantacao', require('./src/routes/plantacaoRouter'));

module.exports = app;
