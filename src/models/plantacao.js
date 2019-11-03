const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const datefns = require('date-fns');

//TODO(-Implementar upload de fotos da plantacao,);
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
  },
  prontoParaColheita: {
    type: Boolean,
    default: false
  },
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
  }],

}, { timestamps: true });

plantacaoSchema.virtual('podeColher')
    .get( function() {
        const p = this.colheita + this.floraçao + this.germinacao;
        if(p !== 0) {
          const dataColheita = datefns.format((datefns.addDays(this.dataInicio, p)), 'dd/MM/yyyy');
          const dataAgora = datefns.format(new Date(Date.now()), 'dd/MM/yyyy');
          return  datefns.isEqual(dataColheita, dataAgora);
        }
        return true;
    });
plantacaoSchema
  .virtual('url')
  .get(function() {
    return '/plantacao/' + this._id;
});

module.exports = mongoose.model('Plantacao', plantacaoSchema);
