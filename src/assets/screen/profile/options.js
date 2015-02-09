angular.module('app').config(function(ScreenFactoryProvider) {
	ScreenFactoryProvider.$get().build('screen-profile-options', function($scope, $http, $rootScope) {
		$scope.p = {};

		$http.get('/api/profile').then(function(rsp) {
			$scope.p = rsp.data;
		});
		
		$scope.save = function() {
			$http.post('/api/profile',$scope.p).then(function(rsp) {
				// BAD CHANGE THIS!
				$rootScope.Profile = rsp.data;
			});
		};
	});
});

