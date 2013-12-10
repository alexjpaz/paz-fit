App.lazy.ScreenFactory('screen-tools-rep-goal', function($scope, FiveThreeOneCalculator, Database) {
	$scope.mdl = {};
	$scope.getRepGoal = function(max, weight) {
		$scope.result = FiveThreeOneCalculator.repgoal(max, weight);
	};

	Database.values('Maxes').done(function(records) {
	  console.log(records);
	});

	$scope.$watch('mdl', function() {
		console.log('apaz');
		$scope.getRepGoal($scope.mdl.max, $scope.mdl.weight);
	}, true);
});
