angular.module('mean')
    .controller('RegisterController', ['$scope', '$window', 'REST', function ($scope, $window, REST) {

        $scope.Register = new REST.Register();

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

            $window.location.href = "/";
        };

        $scope.Submit = function () {
            startProcessing();
            $scope.Register.$save(RequestSuccess, RequestError);
        };

    }]);
