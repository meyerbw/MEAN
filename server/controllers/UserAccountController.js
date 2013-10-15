var winston = require('winston');

exports.ShowSignIn = function(req, res) {
    res.render('signin', {title: "SignIn"});
};
exports.SignIn = function(req, res, next) {
    var userAccountService = require('../services/UserAccountService');
    userAccountService.authenticate(req.body.email, req.body.password);

    userAccountService.once('Error', function (error) {
        res.send(400, error);
        winston.error(error);
    });

    userAccountService.once('UnableToFindUser', function () {
        res.send(400, 'Unable to find user');
    });

    userAccountService.once('UnableToAuthenticateUser', function() {
        res.send(400, 'Unable to authenticate user');
    });

    userAccountService.once('SuccessfullyAuthenticated', function (user) {
        req.login(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/');
        });
    });
};

exports.ShowForgotPassword= function(req, res) {
    res.render('forgot-password');
};
exports.ForgotPassword = function(req, res) {
    var userAccountService = require('../services/UserAccountService');
    userAccountService.forgotPassword(req.body.email);

    userAccountService.once('Error', function (error) {
        res.send(400, 'An error occurred ' + error);
        winston.error(error);
    });

    userAccountService.once('UnableToFindUser', function () {
        res.send(400, 'Unable to find user');
    });

    userAccountService.once('SuccessfullySentForgotPasswordEmail', function (user) {
        res.send(200);
    });
};

exports.ShowResetPassword = function(req, res) {
    res.render('reset-password', {hash: req.query.resetKey});
};
exports.ResetPassword = function(req, res) {
    var userAccountService = require('../services/UserAccountService');
    userAccountService.resetPassword(req.body.resetKey, req.body.password);

    userAccountService.once('Error', function (error) {
        res.send(400, 'An error occurred ' + error);
        winston.error(error);
    });

    userAccountService.once('UnableToFindUser', function () {
        res.send(400, 'Unable to find user');
    });

    userAccountService.once('SuccessfullySentResetPasswordEmail', function (user) {
        res.send(200, 'G2G');
    });
};

exports.ShowRegister = function(req, res) {
    res.render('register', {title: "Register"});
};
exports.Register = function(req, res, next) {
    var userAccountService = require('../services/UserAccountService');
    userAccountService.register(req.body.email, req.body.password);


    userAccountService.once('Error', function (error) {
        res.send(400, 'An error occurred ' + error);
        winston.error(error);
    });

    userAccountService.once('SuccessfullySentRegistrationCompletedEmail', function (user) {
        req.login(user, function(err) {
            if (err) { return next(err); }
            res.send(200);
        });
    });
};

exports.SignOut = function(req, res) {
    req.logout();
    res.redirect('/');
};