App.lazy.ScreenFactory('screen-profile-main', function($scope, Database) {
	$scope.getCurrentMax = function() {
		Database.from('Maxes').list(1).done(function(records) {
			$scope.currentMaxes = records[0];
			$scope.$apply();
		});
	};

	$scope.getCurrentMax();
});
