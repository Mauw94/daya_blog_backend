const multer = require('multer')
const Authentication = require('./controllers/authentication')
const Blog = require('./controllers/blogs')
const Email = require('./controllers/emails');
const passport = require('passport')
const passportService = require('./services/passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {

    const uploader = multer({
        dest: '/uploads',
        limits: {
            fileSize: 52428800
        }
    });

    app.post('/signup', Authentication.signup);
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signout', requireAuth, Authentication.signout);
    app.post('/blogs', Blog.saveBlog);
    app.post('/emails', Email.saveEmail);
    app.post('/updateblog', requireAuth, Blog.updateBlogById);
    app.post('/deleteblog', requireAuth, Blog.deleteBlogById);
    // app.post('/blogimage', [requireAuth, uploader.single('images')], Blog.uploadImage);
    app.get('/blogs', Blog.getBlogs);
    app.get('/blogs/:id', requireAuth, Blog.getBlogById);
    app.get('/lastthree', Blog.getLastThreeBlogs);
}