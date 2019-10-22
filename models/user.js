const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//TODO(-Implementar hashing,
//     -gerenciar cookies de sessão,
//     -autenticar(passport)
// );
SALT_WORK_FACTOR = 8;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
});
userSchema.pre('save', function(next) {
    var user = this;

// only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

// generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword) {
    //verifica se o password é igual
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema
  .virtual('url')
  .get(function() {
    return '/user/' + this._id
  });
const User = mongoose.model('User', userSchema);
module.exports = User;
