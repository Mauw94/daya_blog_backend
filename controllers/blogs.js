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

exports.updateBlogById = function (req, res) {
    var item = {
        title: req.body.title,
        content: req.body.content,
        date: req.body.date,
        image: req.body.image
    };
    var id = req.body.id;
    Blog.updateOne({ '_id': id }, { $set: item }, function (err, result) {
        if (err) {
            return next(err);
        }
        return res.json(result);
    });
}

exports.deleteBlogById = function (req, res) {
    var id = req.params.id;
    console.log(id);
    Blog.deleteOne({ '_id': id }, function (err, result) {
        if (err) {
            return next(err);
        }
        return res.json(result);
    });
}

exports.getBlogById = function (req, res) {
    Blog.findById(req.params.id, function (err, blog) {
        if (err) {
            return next(err);
        }
        return res.json(blog);
    });
}

exports.getLastUploadedBlog = function (req, res) {
  Blog.find(function(err, blog) {
    if (err) {
      return next(err);
    }
    return res.json(blog);
  }).sort({$natural: -1}).limit(1);
}

exports.getLastThreeBlogs = function (req, res) {
    Blog.find(function (err, blogs) {
        if (err) {
            return next(err);
        }
        return res.json(blogs);
    }).sort({ $natural: -1 }).limit(3);
}

exports.uploadImage = function (req, res, next) {
    let mimeTypes = [
        'images/jpeg',
        'images/jpg',
        'images/png'
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
