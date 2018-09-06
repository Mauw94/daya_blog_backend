var Blog = require('../models/blog');
const fs = require('fs');
const mime = require('mime-types');
const path = require('path');

exports.saveBlog = function (req, res, next) {
    const content = req.body.content;
    const date = req.body.date;
    const title = req.body.title;
    const image = req.body.image;

    const blog = new Blog({
        content: content,
        date: date,
        title: title,
        image: image
    });

    blog.save(function (err) {
        if (err) { return next(err); }
        res.send('saved succesfully.');
    });
}

exports.getBlogs = function (req, res) {
    Blog.find(function (err, blogs) {
        if (err) {
            return next(err);
        }
        res.json(blogs);
    });
}

exports.uploadImage = function (req, res, next) {
    let mimeTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png'
    ];
    console.log(req.file.mimetype);
    if (!mimeTypes.includes(req.file.mimetype)) {
        return json.res({ err: 'Error uploading file', type: 'invalid mimetype' });
    }

    let ext = mime.extension(req.file.mimetype);
    let renamedFile = req.file.path + '.' + ext;
    fs.rename(req.file.path, renamedFile, function (err) {
        if (err) {
            return json.res({ err: 'Error uploading file.', type: 'general' });
        }
        res.json({ fileName: renamedFile });
    });
}