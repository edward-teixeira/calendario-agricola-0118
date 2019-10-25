//Dependencias iniciais
require('./src/db/connect');
const express = require('express');
const cookieParser = require('./src/middleware/cookieParser');
const createError = require('http-errors');
const path = require('path');
const userController = require('./src/controller/userController');
const authMiddleware = require('./src/middleware/auth');
const multer = require('multer');
const multerConfig = require('./src/config/multer');

//Sobe o servidor e abre a conexão com o banco
const app = express();

//Configuração de middlewares
app.use(require('./src/middleware/bodyParser').json());
app.use(require('./src/middleware/bodyParser').urlencoded({ extended: true }));
app.use(require('./src/middleware/logger'));
app.use(cookieParser());
const upload = multer(multerConfig);

//Create user
app.post('/user', userController.create_user);

//Rota para login
app.use('/sessions', require('./src/routes/sessionRouter'));

//Middleware de autenticação
app.use(authMiddleware.authHeader);

//Update user
app.put('/user', userController.update_user);
/*app.post('/user/files', upload.single('file'), require('./src/controller/fileController').save);*/
//Rota para plantacoes
app.use('/plantacao', require('./src/routes/plantacaoRouter'));

module.exports = app;
