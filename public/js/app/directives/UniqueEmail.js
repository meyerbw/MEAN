angular.module('mean')
    .directive('uniqueEmail', ['$http', 'REST', '$timeout', function ($http, REST, $timeout) {

        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                var timeoutId;
                var RequestCompleted = function (data) {
                    ctrl.$setValidity('uniqueEmail', data.isValid || false);
                };

                scope.$watch(attr.ngModel, function (value) {
                    if (timeoutId) $timeout.cancel(timeoutId);
                    if (!value) return ctrl.$setValidity('uniqueEmail', true);

                    timeoutId = $timeout(function () {
                        var user = new REST.User({email: value});
                        user.$isUnique(RequestCompleted, RequestCompleted);

                    }, 200);
                })
            }
        }
    }]);