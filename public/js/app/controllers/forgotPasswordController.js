angular.module('mean')
    .controller('ForgotPasswordController', ['$scope', 'REST', function ($scope, REST) {

        $scope.ForgotPassword = new REST.ForgotPassword();

        function startProcessing() {
            $scope.ProcessingRequest  = true;
            $scope.Errors = [];
        }

        function endProcessing() {
            $scope.ProcessingRequest  = false;
        }

        var RequestError = function (response) {
            endProcessing();

            $scope.RequestComplete = false;
            $scope.HasErrors = true;
            if(angular.isArray(response.data)) {
                angular.forEach(response.data, function(error) {
                    $scope.Errors.push({message:error});
                });
            }
            else
                $scope.Errors.push({message:response.data});

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
