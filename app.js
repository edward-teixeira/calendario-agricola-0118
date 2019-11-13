//Dependencias iniciais
require('./src/db/connect');
//require('./src/middleware/detectOnDatabaseChange');
const chalk = require('chalk');
const express = require('express');
const cookieParser = require('./src/middleware/cookieParser');
const createError = require('http-errors');
const path = require('path');
const userController = require('./src/controller/userController');
const authMiddleware = require('./src/middleware/auth');
const multer = require('multer');
const multerConfig = require('./src/config/multer');
const user = require('./src/models/user');

//Sobe o servidor e abre a conexão com o banco
const app = express();

//Configuração de middlewares
app.use(require('./src/middleware/bodyParser').json());
app.use(require('./src/middleware/bodyParser').urlencoded({ extended: true }));
app.use(require('./src/middleware/logger'));
app.use(cookieParser());


//Cadastra o usuário
app.post('/signup',userController.create_user);
app.post('/signin', userController.logar_user);
app.use(authMiddleware.authHeader);
//app.post('/logout', userController.logout_user);
app.use('/', require('./src/routes/sessionRouter'));
//Update user
//app.put('/user', userController.update_user);
//Rota para plantacoes
app.use('/plantacao', require('./src/routes/plantacaoRouter'));
app.use('/colheita', require('./src/routes/colheitaRouter'));

module.exports = app;
