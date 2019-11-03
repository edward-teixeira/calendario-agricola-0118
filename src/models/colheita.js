const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    type: Schema.Types.ObjectId,
    ref: 'plantacao',
    required: true
  }
}
});
colheitaSchema
  .virtual('url')
  .get(function() {
    return '/colheita/' + this._id;
  });

module.exports = mongoose.model('colheita', colheitaSchema);
