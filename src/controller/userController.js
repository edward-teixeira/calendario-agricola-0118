const User = require('../models/user');
//index, show, store, update, destroy
exports.list_user = async (req,res,next) => {
  try {
   const user = await User.find({}).exec();
   res.status(200).json(user);
  }catch(error) {
    res.status(500).send();
  }
};
exports.create_user = async (req, res) => {

      const {name, password, email} = req.body;
      const isFound = await User.exists({email: req.body.email});
      if(!isFound) {
          await User.create({name: name, password: password, email: email})
              .then(user => res.status(200).json({success: true, user}))
              .catch(err => res.status(500).json({success: false, message: "Ocorreu um erro ao salvar o documento"}));
      }
      else
        return res.status(400).json({success: true, message: "Email já está cadastrado"});

};
exports.update_user = async (req, res) => {
    const {email, oldpassword } = req.body;
    const user = User.findById(req.userId);
    if(email !== user.email)  {
        const userExists = await User.findOne({email: email});
        if(userExists) return res.status(400).json({error: 'Usuário já existe'});
    }
    if(oldpassword && !(await user.comparePassword(oldpassword))) {
        return res.status(401).json({error: 'Password inválido'})
    }
    const {id, name} = await User.findByIdAndUpdate(user.id, req.body);
    res.status(200).json({message: 'ok'});
};
 exports.delete_user = async (req, res) => {
  const deletedNote = await Note.findByIdAndDelete(req.params.id).exec();
  res.status(200).json(deletedNote);
};
