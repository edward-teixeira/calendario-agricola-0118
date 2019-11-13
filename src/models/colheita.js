const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const datefns = require('date-fns');

const colheitaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
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
      default:1
    },
    gosto:{
      type: Number,
      min: [1, 'Avalicao deve ter o minimo de 1'],
      max: [5, 'Avaliacao deve ter o maximo de 5'],
    default:1
    } ,
    Densidade:{
      type: Number,
      min: [1, 'Avalicao deve ter o minimo de 1'],
      max: [5, 'Avaliacao deve ter o maximo de 5'],
      default:1
    } ,
    Visual: {
      type: Number,
      min: [1, 'Avalicao deve ter o minimo de 1'],
      max: [5, 'Avaliacao deve ter o maximo de 5'],
      default:1
  }
  },
  observacoes: {
    type: String,
    maxlength: [15, 'Observações não podem execeder 15 caracteres'],
    trim: true
  },
    nome: {
      type: String,
      require: true,
    },
    tipoPlantio: {
      type: String,
      enum: ['semente','muda']
    },
    dataInicio: {
      type: Date,
      default: Date.now()
    },
  /*plantacao: {
    type: Schema.Types.ObjectId,
    ref: 'plantacao',*/
  }
);
colheitaSchema.virtual('dataIni')
    .get( function() {
        return datefns.format(this.dataInicio, 'dd/MM/yyyy');
    });
colheitaSchema
  .virtual('url')
  .get(function() {
    return '/colheita/' + this._id;
  });

module.exports = mongoose.model('colheita', colheitaSchema);
