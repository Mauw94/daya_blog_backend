var Blog = require('../models/blog');

exports.saveBlog = function (req, res, next) {
    console.log('THE BODY: ' + req.body.content);
    const content = req.body.content;
    const date = req.body.date;

    const blog = new Blog({
        content: content,
        date: date
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