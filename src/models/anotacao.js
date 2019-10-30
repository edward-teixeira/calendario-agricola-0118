const mongoose = require('mongoose');

//!(Medicacao será um Enum?)
const anotacaoSchema = mongoose.Schema({
  titulo: {
    type: String,
    maxlength: [10, 'Titulo deve deve ter no máximo 10 caracteres'],
    minlength: [1, 'Titulo deve ter no máximo 1 caractere']
  },
  descricao:{
    type: String,
    maxlength: [20, 'Titulo deve deve ter no máximo 20 caracteres'],
    minlength: [1, 'Titulo deve ter no máximo 1 caractere']
  },
}, {timestamp: true});
anotacaoSchema
  .virtual('url')
  .get(function() {
    return '/user/plantacao/anotacao/' + this._id;
  });

module.exports = mongoose.model('Anotacao', anotacaoSchema);
