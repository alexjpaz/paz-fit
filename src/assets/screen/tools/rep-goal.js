angular.module('app').lazy.ScreenFactory('screen-tools-rep-goal', function($scope, FiveThreeOneCalculator, Database) {
	$scope.mdl = {};

	$scope.useMax = function(lift) {
		$scope.mdl.max = $scope.currentMaxes[lift]; 
	};

	$scope.useFraction = function(fraction) {
		$scope.mdl.weight = Math.round($scope.mdl.max * fraction / 5) * 5;
	};

	$scope.getCurrentMax = function() {
		Database.from('Maxes').list(1).done(function(records) {
			$scope.currentMaxes = records[0];
			$scope.$apply();
		});
	};

	$scope.getCurrentMax();

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
