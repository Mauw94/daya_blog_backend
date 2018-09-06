const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    content: { type: String },
    date: { type: String },
    title: { type: String },
    image: { type: String }
});

const ModelClass = mongoose.model('blog', blogSchema);

module.exports = ModelClass;