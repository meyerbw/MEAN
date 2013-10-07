angular.module('mean')
	.directive('rmsStatefulButton', ['$compile', function ($compile) {
		return {
			restrict: 'A',
			replace: false,
			transclude: false,
			scope: {
				loading: '=loading',
				clickHandler: '&ngClick'
			},
			link: function (scope, el, atts) {
				atts.$watch('loading', function () {
					if (scope.loading) {
                        $(el).button('loading')
					} else {
                        $(el).button('reset')
					}
				});

			  el.bind('click', function() {scope.clickHandler()});

			}
		};
	}]);
