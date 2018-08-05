
var User = require('../models/user');
var Token = require('../models/token');
var jwt = require('jwt-simple');
var config = require('../config');

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp, sessionid: user.sessionid }, config.secret);
}

exports.signin = function (req, res, next) {
    // User has already had their email and password auth'd
    // We just need to give them a token
    token: '';
    User.findById(req.user._id, function (err, user) {
        if (err) { return next(err) }
        const timestamp = new Date().getTime();
        req.user.sessionid = timestamp;
        token = tokenForUser(req.user);
        User.update({ _id: user._id }, { token: timestamp }, function (err) {
            return next(err);
        })
        res.send({ token: token });
    })
}

exports.signup = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ error: 'You must provide both an e-mail and password.' });
    }

    // See if a user with the given email exists
    User.findOne({ email: email }, function (err, existingUser) {
        if (err) { return next(err); }

        // If a user with email does exist, return an error
        if (existingUser) {
            return res.status(422).send({ error: 'Email is in use' });
        }

        // If a user with email does NOT exist, create and save user record
        const user = new User({
            email: email,
            password: password,
            token: ''
        });

        // // Create and save the token in the database
        // const token = new Token({
        //     userId: user.id,
        //     token: tokenForUser(user)
        // });

        // token.save(function (err) {
        //     if (err) { return next(err); }
        // });

        // Save the user to the db
        user.save(function (err) {
            if (err) { return next(err); }
            // Respond to request indicating the user was created
            res.json({ token: tokenForUser(user) });
        });
    });
}

exports.signout = function (req, res, next) {
    User.findById(req.user._id, function (err, user) {
        if (user) {
            User.update({ _id: req.user._id }, { $set: { token: '' } }, function (err) {
                return next(err);
            })
            res.sendStatus(200);
        }
    })
}


exports.saveToken = function (req, res, next) {
    const token = req.body.token;

    if (!token) {
        return res.status(422).send({ error: 'You are not authenticated.' });
    }


}