const mongoose = require('mongoose');

//!(Medicacao será um Enum?)
const anotacaoSchema = mongoose.Schema({
  titulo: String,
  descricao: String,
  data: Date.now,
  campo: String,
  medicacao: String
});
anotacaoSchema
  .virtual('url')
  .get(function() {
    return 'Nao Implementado' + this._id;
  });

module.exports = mongoose.model('Anotacao', anotacaoSchema);