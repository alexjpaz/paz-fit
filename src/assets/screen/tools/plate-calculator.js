angular.module('app').config(function(ScreenFactoryProvider) {
	var ScreenFactory = ScreenFactoryProvider.$get();
	ScreenFactory.build('screen-tools-plate-calculator', function($scope, FiveThreeOneCalculator) {
	$scope.mdl = {};
	$scope.getRepGoal = function(max, weight) {
		$scope.result = FiveThreeOneCalculator.repgoal(max, weight);
	};

	$scope.$watch('mdl', function() {
		$scope.getRepGoal($scope.mdl.max, $scope.mdl.weight);
	}, true);
});
});
