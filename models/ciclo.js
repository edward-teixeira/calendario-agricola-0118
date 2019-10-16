const mongoose = require('mongoose');

const cicloSchema = new mongoose.Schema({
  dataInicio: {
    type: Date.now,
    required: true
  },
  germinacao: {
    type: Number,
    default: 0
  },
  crescimento: {
    type: Number,
    default: 0
  },
  floracao: {
    type: Number,
    default: 0
  }
});

cicloSchema
  .virtual('dataColheita')
  .get(function() {
    return (this.germinacao + this.crescimento + this.floracao);
  });
cicloSchema
  .virtual('url')
  .get(function() {
    return 'Nao Implementado ' + this._id;
  });

  module.exports = ('Ciclo', cicloSchema);