const multer = require('multer');
const crypto = require('crypto');
const {extname, resolve} = require('path');

//Configuração do Multer
const multerConfig = {
    storage: multer.diskStorage({
        destination: resolve(__dirname,'..', '..', 'tmp', 'uploads'),
        filename: (req, file, cb) => {
            //Formatação do nome do arquivo
            crypto.randomBytes(16, (err, res) => {
                if(err) return cb(err);
                console.log('**Dentro da configuração do multer**');
                return cb(null, res.toString('hex') + extname(file.originalname))
            })
        }
    })
};

module.exports = multerConfig;
