angular.module('app').lazy.ScreenFactory('screen-tools-rep-goal', function($scope, FiveThreeOneCalculator) {
	$scope.mdl = {};
	$scope.getRepGoal = function(max, weight) {
		$scope.result = FiveThreeOneCalculator.repgoal(max, weight);
	};

	$scope.$watch('mdl', function() {
		$scope.getRepGoal($scope.mdl.max, $scope.mdl.weight);
	}, true);
});
