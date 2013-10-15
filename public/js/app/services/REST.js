angular.module('mean')
    .factory('REST', ['$resource', 'EndPointUrls', function ($resource, EndPointUrls) {
        return {
            'SignIn': $resource(EndPointUrls.SignIn),
            'ForgotPassword': $resource(EndPointUrls.ForgotPassword),
            'ResetPassword': $resource(EndPointUrls.ResetPassword),
            'Register': $resource(EndPointUrls.Register),
            'User': $resource(EndPointUrls.User, {}, {
                isUnique: { method:'POST', params: {action: 'is-unique'} }
            })
        };
    }]);
