var util = require('util')
    , events = require('events')
    , mongoose = require('mongoose')
    , user = mongoose.model('User')
    , mailer = require('../lib/mailer');

var UserAccountService = function () {
    var self = this;
    self.authenticate = function (email, password) {
        user.findAndAuthenticate({email: email, password: password}, function findAndAuthenticateCallback(error, wasFound, wasAuthenticated, foundUser) {
            if (error) {
                return self.emit('Error', error);
            }

            if (!wasFound) {
                return self.emit('UnableToFindUser');
            }

            if (wasAuthenticated) {
                return self.emit('SuccessfullyAuthenticated', foundUser);
            } else {
                return self.emit('UnableToAuthenticateUser');
            }
        });
    };

    self.forgotPassword = function (email) {
        user.findAndSetForgotPassword({email: email}, function findAndSetForgotPasswordCallback(error, wasFound, foundUser) {
            if (error)
                return self.emit('Error', error);

            if (!wasFound)
                return self.emit('UnableToFindUser');


            mailer.send('ForgotPassword', {to:foundUser.email}, 'TEST - ForgotPassword', foundUser, function sendMailCallback(error) {
                if (error)
                    return self.emit('Error', error);

                return self.emit('SuccessfullySentForgotPasswordEmail', foundUser);
            });
        });
    };

    self.resetPassword = function (userHash, password) {
        user.findAndSetPassword({forgotPasswordHash: userHash, password: password}, function findAndSetPasswordCallback(error, wasFound, foundUser) {
            if (error)
                return self.emit('Error', error);

            if (!wasFound)
                return self.emit('UnableToFindUser');

            mailer.send('ResetPassword', {to:foundUser.email}, 'Reset Password', foundUser, function sendMailCallback(error) {
                if (error)
                    return self.emit('Error', error);

                self.emit('SuccessfullySentResetPasswordEmail', foundUser);
            })
        });
    };

    self.register = function (email, password) {
        var newUser = new user({email: email, password: password});
        newUser.save(function registerSaveCallback(error) {
            if (error)
                return self.emit('Error', error);

            mailer.send('Registered', {to: newUser.email}, 'Registration Complete', newUser, function sendMailCallback(error) {
                if (error)
                    return self.emit('Error', error);

                self.emit('SuccessfullySentRegistrationCompletedEmail', newUser);
            });
        })
    };
};

util.inherits(UserAccountService, events.EventEmitter);
module.exports = new UserAccountService();