const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO(Implementar upload de fotos da plantacao);
const plantacaoSchema = new mongoose.Schema({
  nome: {
    type: String,
    maxlength: 15,
    minlength: 1
  },
  sistemaPlantio: {
    type: String,
    enum: ['hidroponia','terra'],
  tipoPlantio: {
    type: String,
    enum: ['semente', 'muda']
  },
  dataInicio: Date.now,
  ciclo: {
    type: Schema.Types.ObjectId,
    ref: 'ciclo'
  },
  anotacao: [{
    type: Schema.Types.ObjectId,
    ref: 'anotacao'
  }],

  }
});
plantacaoSchema
  .virtual('url')
  .get(function() {
    return 'Nao implementado ' + this._id;
});

module.exports = mongoose.model('Plantacao', plantacaoSchema);