angular.module('app').config(function(ScreenFactoryProvider) {
	var ScreenFactory = ScreenFactoryProvider.$get();
	ScreenFactory.build('screen-profile-maxes-list', function($scope, $routeParams, MaxesDao) {
	$scope.date = $routeParams.date; 

	$scope.getMaxesList  = function() {
		MaxesDao.find().then(function(maxes) {
			$scope.maxes = maxes;
		});
	};

	$scope.getMaxesList();
});

});
