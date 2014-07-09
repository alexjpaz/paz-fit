angular.module('app').config(function(DirectiveProvider) {
	DirectiveProvider.register('route-aware', function () {
		return {
			controller: function($scope, $routeParams) {
				$scope.$routeParams = $routeParams;
			}
		};
	});
});
