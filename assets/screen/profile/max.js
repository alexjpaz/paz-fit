App.lazy.ScreenFactory('screen-profile-max', function($scope, Database) {

	$scope.getMaxes = function() {
		Database.from('Max').list().done(function(records) {
			$scope.maxes = records;
			$scope.newMax = angular.copy(records[0]);
			$scope.$apply();
		});
	};

	$scope.addMax = function(max) {
		var req = Database.put('Max', max);
		
		req.done(function() {
			$scope.getMaxes();
		});

		req.fail(function() {
		});
	};

	$scope.getMaxes();
});
