angular.module('mean')
    .factory('REST', ['$resource', 'EndPointUrls', function ($resource, EndPointUrls) {
        return {
            'Login': $resource(EndPointUrls.Login),
            'ForgotPassword': $resource(EndPointUrls.ForgotPassword),
            'ResetPassword': $resource(EndPointUrls.ResetPassword),
            'Register': $resource(EndPointUrls.Register)
        };
    }]);
