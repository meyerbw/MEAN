angular.module('mean')
    .controller('ResetPasswordController', ['$scope', 'QueryString', 'REST', function ($scope, QueryString, REST) {

        $scope.ResetPassword = new REST.ResetPassword({code: QueryString.code});
        $scope.ButtonText = 'Rest Password';

        function startProcessing() {
            $scope.ProcessingRequest  = true;
            $scope.ButtonText = 'Resetting...';
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
            $scope.ResetPassword.$save(RequestSuccess, RequestError);
        };

    }]);
