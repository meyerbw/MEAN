angular.module('mean')
    .controller('LoginController', ['$scope', 'REST', function ($scope, REST) {

        $scope.Login = new REST.Login();
        $scope.ButtonText = 'Sign in';

        function startProcessing() {
            $scope.ProcessingRequest  = true;
            $scope.ButtonText = 'Authenticating...';
        }

        function endProcessing() {
            $scope.ProcessingRequest  = false;
            $scope.ButtonText = 'Sign in';
        }

        var RequestError = function (response) {
            endProcessing();

            $scope.RequestComplete = false;
            $scope.HasErrors = true;
            $scope.Errors = response.data;
        };

        var RequestSuccess = function () {
            endProcessing();

            $scope.RequestComplete = true;
            $scope.HasErrors = false;
            $scope.Errors = null;
        };

        $scope.Submit = function () {
            startProcessing();
            $scope.Login.$save(RequestSuccess, RequestError);
        };

    }]);
