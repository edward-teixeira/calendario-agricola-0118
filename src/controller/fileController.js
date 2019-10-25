const File = require('../models/files');
const User = require('../models/user');

exports.save = async (req, res, next) => {
    const {originalName: name, fileName: path} = req.file;
    try{
        const file = await File.create({name: req.file.originalname.toString(), path: req.file.filename.toString()}
        , async function(err, file) {
            if(err)
                 res.status(400).json({error: 'Ocorreu um erro ao salvar arquivo'})
                 next(err);
            if(file) {
                file.save();
                const user = await User.findOneAndUpdate({id: req.userId}, file, {new: true});
                res.status(202).json({message: 'Arquivo Salvo com sucesso'})
            }
        })
    }catch(error) {
        res.status(500).json({error: "Não foi possível salvar o arquivo"})
    }
};
