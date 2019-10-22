const mongoose = require('mongoose');

const colheitaSchema = new mongoose.Schema({
  quantidade: {
    type: Number,
  },
  tamanho: {
    type: Number
  },
  classificacao: {
    cheiro:{
      type: Number,
      min: [1, 'Avalicao deve ter o minimo de 1'],
      max: [5, 'Avaliacao deve ter o maximo de 5'],
      default: 0
    },
    gosto:{
      type: Number,
      min: [1, 'Avalicao deve ter o minimo de 1'],
      max: [5, 'Avaliacao deve ter o maximo de 5'],
    default: 0
    } ,
    Densidade:{
      type: Number,
      min: [1, 'Avalicao deve ter o minimo de 1'],
      max: [5, 'Avaliacao deve ter o maximo de 5'],
      default: 0
    } ,
    Visual: {
      type: Number,
      min: [1, 'Avalicao deve ter o minimo de 1'],
      max: [5, 'Avaliacao deve ter o maximo de 5'],
      default: 0
  },
  observacoes: {
    type: String,
    maxlength: [15, 'Observações não podem execeder 15 caracteres'],
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
    return '/user/colheita/' + this._id;
  });

module.exports = mongoose.model('Colheita', colheitaSchema);
