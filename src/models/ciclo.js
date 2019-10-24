const mongoose = require('mongoose');
//TODO(-Os campos numericos devem ser inteiros)
const cicloSchema = new mongoose.Schema({
  dataInicio: {
    type: new Date(Date.now()) //TODO(verificar isso);
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
    return '/user/plantacao/ciclo/' + this._id;
  });

  module.exports = ('Ciclo', cicloSchema);
