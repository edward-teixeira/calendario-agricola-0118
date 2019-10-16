const User = require('../models/user');
//index, show, store, update, destroy
exports.list_user = async (req,res,next) => {
  try {
   const notes = await User.find({}).exec();
   res.status(200).json(notes);
  }catch(error) {
    res.status(500).send();
  }
};
exports.create_user = async (req, res) => {
  try {
   const {name, email} = req.body;
   const user = await User.findOne({name: name})
    .then(async user => {
      if(!user) {
        const newUser = await User.create({
        name: req.body.name,
        email: req.body.email});
        res.status(201).json(newUser);
      } else {
        res.send({error: 'User Already Exists'})
      }
    }).catch(err => res.status(500).send(err));

}catch(error) {
  console.error(error);
  res.status(500).send();
}
};
 exports.delete_user = async (req, res) => {
  const deletedNote = await Note.findByIdAndDelete(req.params.id).exec();
  res.status(200).json(deletedNote);
}; 
exports.update_user = async (req, res) => {
  try {
  const user = await User.findById(req.params.id);
  if(!user) res.status(404).json({error: 'usuario nao existe'});
  const updatedUser = await User.findByIdAndUpdate(req.params.id, {name: req.params.name, email: req.params.email},{new: true}).exec();
  res.status(201).json(updatedUser);
  }catch(error) {
    console.log(error);
  }
  res.status(200).json(deletedNote);
};