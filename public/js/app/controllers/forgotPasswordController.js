angular.module('mean')
    .controller('ForgotPasswordController', ['$scope', 'REST', function ($scope, REST) {

        $scope.ForgotPassword = new REST.ForgotPassword();
        $scope.ButtonText = 'Rest Password';

        function startProcessing() {
            $scope.ProcessingRequest  = true;
            $scope.ButtonText = 'Sending...';
        }

        function endProcessing() {
            $scope.ProcessingRequest  = false;
            $scope.ButtonText = 'Rest Password';
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
            $scope.ForgotPassword.$save(RequestSuccess, RequestError);
        };

    }]);
