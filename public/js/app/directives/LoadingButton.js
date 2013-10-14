angular.module('mean')
    .directive('loadingButton', [function () {
        return {
            transclude: false,
            scope: true,
            link: function (scope, el, atts) {
                atts.$observe('loading', function (value) {
                    var casedVal = value.toLowerCase();

                    var isTrue = (casedVal === "true" || casedVal === "yes" || casedVal === "1" );

                    if (isTrue)
                        $(el).button('loading');
                    else
                        $(el).button('reset');
                });
            }
        };
    }]);
