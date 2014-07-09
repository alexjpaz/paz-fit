angular.module('app').config(function(ScreenProvider) {


	ScreenProvider.register('screen-system-error', {
			componentGroup: 'common',
			controller: function($scope, $routeParams, $location, $route) {
				$scope.search = $location.search();

				$scope.routes = $route.routes;

				$scope.goBack = function() {
					history.go(-1); // TODO make a service
				};
			}
	});
});
