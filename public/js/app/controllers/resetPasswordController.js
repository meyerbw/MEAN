angular.module('mean')
    .controller('ResetPasswordController', ['$scope', 'QueryString', 'REST', function ($scope, QueryString, REST) {

        $scope.ResetPassword = new REST.ResetPassword({code: QueryString.code});


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
            $scope.ResetPassword.$save(RequestSuccess, RequestError);
        };

    }]);
