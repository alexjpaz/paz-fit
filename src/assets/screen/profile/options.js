angular.module('app').config(function(ScreenFactoryProvider) {
	ScreenFactoryProvider.$get().build('screen-profile-options', function($scope, $http) {
		$scope.p = {};

		$http.get('/api/profile').then(function(rsp) {
			$scope.p = rsp.data;
		});
		
		$scope.save = function() {
			$http.post('/api/profile',$scope.p).then(function(rsp) {
				console.debug(rsp.data);
			});
		};
	});
});

