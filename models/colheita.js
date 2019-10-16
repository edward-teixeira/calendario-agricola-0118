const mongoose = require('mongoose');

const colheitaSchema = new mongoose.Schema({
  quantidade: {
    type: Number,
  },
  tamanho: {
    type: Number
  },
  classificação: {
    cheiro:{
      type: Number,
      min: 1,
      max: 5,
      default: 0
    },
    gosto:{
      type: Number,
      min: 1,
      max: 5,
    default: 0
    } ,
    Densidade:{
      type: Number,
      min: 1,
      max: 5,
      default: 0
    } ,
    Visual: {
      type: Number,
      min: 1,
      max: 5 ,
      default: 0
  },
  observacoes: {
    type: String,
    min: 1,
    max: 5,
    trim: true
  },
  plantacao: {
    type: Schema.Type.ObjectId,
    ref: 'plantacao'
  }
}
});
colheitaSchema
  .virtual('url')
  .get(function() {
    return 'Nao implementado' + this._id;
  });

module.exports = mongoose.model('Colheita', colheitaSchema);