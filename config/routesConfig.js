var UserAccountController = require('../server/controllers/UserAccountController')
    , siteController = require('../server/controllers/siteController');
//    , passportConfig = require('./passportConfig') ;


var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/sign-in')
};

module.exports = function(app, passport) {

    app.get('/', ensureAuthenticated, siteController.index);

    //General Account Actions
    app.get('/forgot-password', UserAccountController.ShowForgotPassword);
    app.post('/forgot-password', UserAccountController.ForgotPassword);

    app.get('/reset-password', UserAccountController.ShowResetPassword);
    app.post('/reset-password', UserAccountController.ResetPassword);

    app.get('/sign-in', UserAccountController.ShowSignIn);
    app.post('/sign-in', UserAccountController.SignIn);

    app.get('/sign-out', UserAccountController.SignOut);
    app.post('/sign-out', UserAccountController.SignOut);

    app.get('/register', UserAccountController.ShowRegister);
    app.post('/register', UserAccountController.Register);

    app.post('/user/is-unique', UserAccountController.isUnique)

    app.get('/auth/google',
        passport.authenticate('google', {
            failureRedirect: '/sign-in',
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ]
        }), UserAccountController.socialSignIn);

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/login'
        }), UserAccountController.authCallback);



};
