const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO(
//      -Implementar upload de fotos da plantacao,
//      -Implementar paginação
//      -Colocar required nos campos);
const plantacaoSchema = new mongoose.Schema({
  nome: {
    type: String,
    trim: true,
    unique: true,
    maxlength: [15, "Nome deve ter no máximo 15 caracteres"],
    minlength: [1, "Nome deve ter no mínimo 1 caractere"]
  },
  sistemaPlantio: {
    type: String,
    enum: ['hidroponia', 'terra'],
  },
  tipoPlantio: {
    type: String,
    enum: ['semente','muda']
  },
  ciclo: {
   germinacao: {
     type: Number,
     default: 5
   },
    floraçao: {
     type: Number,
     default: 70
    },
    colheita: {
       type: Number,
       default: 75
    }
  },
  prontoParaColheita: false,
  dataInicio: {
    type: Date,
    default: Date.now()
  },
  ciclo: {
    type: Schema.Types.ObjectId,
    ref: 'ciclo'
  },
  anotacao: [{
    type: Schema.Types.ObjectId,
    ref: 'anotacao',
    default: "Nenhuma anotação"
  }],

}, { timestamps: true });
plantacaoSchema.method('data')
plantacaoSchema
  .virtual('url')
  .get(function() {
    return '/plantacao/' + this._id;
});

module.exports = mongoose.model('Plantacao', plantacaoSchema);
