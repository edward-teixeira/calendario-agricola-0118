const mongoose  = require('mongoose');

const bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 8;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
	default: ""
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
});

//Função que roda momentos antes de persistir os dados no banco
userSchema.pre('save', function(next) {
    var user = this;

//Se o usuario não modificou a senha, persiste os dados
    if (!user.isModified('password')) return next();
// Salt = complexidade do algoritmo de encriptação, quanto mais alto maior e mais lento
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {

        if (err) return next(err);
        // Gera um novo algoritmo para uma nova senha
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            // A senha do usuário é agora o hash
            user.password = hash;
            return next();
        });
    });
});
//Compara a senha que o usuario está tentando usar com a existente no banco
userSchema.methods.comparePassword = function (candidatePassword) {
    const user = this;
    return new Promise ((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if(err) return reject(err);
            if(!isMatch) return reject(false);
            return resolve(true);
        });
    })
};
userSchema
    .virtual('url')
    .get(function() {
        return '/user/' + this._id
    });
const User = mongoose.model('User', userSchema);
module.exports = User;
