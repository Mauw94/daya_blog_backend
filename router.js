const multer = require('multer')
const Authentication = require('./controllers/authentication')
const Blog = require('./controllers/blogs')
const passport = require('passport')
const passportService = require('./services/passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
    app.post('/signup', Authentication.signup);
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signout', requireAuth, Authentication.signout);
    app.post('/blogs', Blog.saveBlog);
    app.get('/blogs', Blog.getBlogs);
}