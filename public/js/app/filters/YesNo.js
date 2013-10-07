angular.module('mean')
    .filter('blankData', [function () {
        return function (input) {
            if (!input) {
                if(input === false)
                {
                    return "No";
                }
                return "-";
            }


            return "Yes";
        };
    }]);
