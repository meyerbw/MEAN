angular.module('mean')
    .constant('EndPointUrls', {
        SignIn: '/sign-in',
        ForgotPassword: '/forgot-password',
        Register: '/register',
        ResetPassword: '/reset-password',
        User: '/user/:action'
    });
