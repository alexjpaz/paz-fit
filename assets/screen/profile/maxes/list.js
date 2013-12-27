angular.module('app').lazy.ScreenFactory('screen-profile-maxes-list', function($scope, $routeParams, Database, DatastoreSync) {
	$scope.date = $routeParams.date; 

	$scope.getMaxesList  = function() {
		var promise = Database.values('Maxes');
		
		promise.done(function(records) {
			$scope.maxesList = records;
			$scope.$apply();
		});
	};

	$scope.getMaxesList();
});
