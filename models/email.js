const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({
    mail: { type: String },
    date: { type: String }
});

const ModelClass = mongoose.model('email', emailSchema);

module.exports = ModelClass;