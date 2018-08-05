const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: String,
    token: String
});

const ModelClass = mongoose.model('token', tokenSchema);

module.exports = ModelClass;