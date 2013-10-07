var winston = require('winston');

exports.ShowSignIn = function(req, res) {
    res.render('signin', {title: "SignIn"});
};
exports.SignIn = function(req, res, next) {
    var userAccountService = require('../services/UserAccountService');
    userAccountService.authenticate(req.body.email, req.body.password);

    userAccountService.on('Error', function (error) {
        res.send(400, 'An error occurred ' + error);
        winston.error(error);
    });

    userAccountService.on('UnableToFindUser', function () {
        res.send(400, 'Unable to find user');
    });

    userAccountService.on('UnableToAuthenticateUser', function() {
        res.send(400, 'Unable to authenticate user');
    });

    userAccountService.on('SuccessfullyAuthenticated', function (user) {
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

    userAccountService.on('Error', function (error) {
        res.send(400, 'An error occurred ' + error);
        winston.error(error);
    });

    userAccountService.on('UnableToFindUser', function () {
        res.send(400, 'Unable to find user');
    });

    userAccountService.on('SuccessfullySentForgotPasswordEmail', function (user) {
        res.send(200, 'G2G');
    });
};

exports.ShowResetPassword = function(req, res) {
    res.render('reset-password', {hash: req.query.resetKey});
};
exports.ResetPassword = function(req, res) {
    var userAccountService = require('../services/UserAccountService');
    userAccountService.resetPassword(req.body.resetKey, req.body.password);

    userAccountService.on('Error', function (error) {
        res.send(400, 'An error occurred ' + error);
        winston.error(error);
    });

    userAccountService.on('UnableToFindUser', function () {
        res.send(400, 'Unable to find user');
    });

    userAccountService.on('SuccessfullySentResetPasswordEmail', function (user) {
        res.send(200, 'G2G');
    });
};

exports.ShowRegister = function(req, res) {
    res.render('register', {title: "Register"});
};
exports.Register = function(req, res) {
    var userAccountService = require('../services/UserAccountService');
    userAccountService.register(req.body.email, req.body.password);


    userAccountService.on('Error', function (error) {
        res.send(400, 'An error occurred ' + error);
        winston.error(error);
    });

    userAccountService.on('SuccessfullySentRegistrationCompletedEmail', function (user) {
        res.send(200, 'G2G');
    });
};

exports.SignOut = function(req, res) {
    req.logout();
    res.redirect('/');
};