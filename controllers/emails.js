var Email = require('../models/email');

exports.saveEmail = function (req, res, next) {
    console.log(req.body.email);
    const mail = req.body.email;
    const date = req.body.date;

    const email = new Email({
        mail: mail,
        date: date
    });

    email.save(function (err) {
        if (err) { return next(err); }
        res.send('saved succesfully.');
    });
}
