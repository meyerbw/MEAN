angular.module('mean')
    .controller('RegisterController', ['$scope', 'QueryString', 'REST', function ($scope, QueryString, REST) {

        $scope.$scope.Register = new REST.Register();
        $scope.ButtonText = 'Create Account';

        function startProcessing() {
            $scope.ProcessingRequest  = true;
            $scope.ButtonText = 'Creating Account...';
        }

        function endProcessing() {
            $scope.ProcessingRequest  = false;
            $scope.ButtonText = 'Create Account';
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
            $scope.Register.$save(RequestSuccess, RequestError);
        };

    }]);
