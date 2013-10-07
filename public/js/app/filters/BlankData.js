angular.module('mean')
    .filter('blankData', [function () {
        return function (input) {
            if (!input)
                return "-";

            return input;
        };
    }]);
