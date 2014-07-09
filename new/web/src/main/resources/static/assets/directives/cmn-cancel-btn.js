angular.module('app').config(function($compileProvider) {
	$compileProvider.directive('cmnCancelBtn', function($window) {
		return {
			link: function(scope, element) {
				element.bind('click', function () {
					$window.history.back();
				});
			}
		};
	});
});


