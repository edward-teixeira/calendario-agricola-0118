const mongoose = require('mongoose');
//TODO(Implementar hashing, gerenciar cookies de sessão, autenticar(passport));
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
  }
});
userSchema
  .virtual('url')
  .get(function() {
    return '/user/' + this._id
  })
const User = mongoose.model('User', userSchema);
module.exports= User;