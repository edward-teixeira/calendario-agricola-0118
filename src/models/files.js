const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
});
const File = mongoose.model('file', fileSchema);
module.exports = File;
