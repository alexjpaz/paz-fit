App.lazy.ScreenFactory('screen-profile-personal-record', function($scope, Database) {

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
			console.info('apaz_done', arguments);
		});

		req.fail(function() {
			console.info('apaz_fail', arguments);
		});
	};

	$scope.getMaxes();
});
