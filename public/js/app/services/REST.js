angular.module('mean')
    .factory('REST', ['$resource', 'EndPointUrls', function ($resource, EndPointUrls) {
        return {
            'SignIn': $resource(EndPointUrls.SignIn),
            'ForgotPassword': $resource(EndPointUrls.ForgotPassword),
            'ResetPassword': $resource(EndPointUrls.ResetPassword),
            'Register': $resource(EndPointUrls.Register)
        };
    }]);
