angular.module('app').config(function(ComponentFactoryProvider){
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('plate-table', {
		controller: function($scope, $attrs, Resource, FiveThreeOneCalculator) {
			$scope.week = $scope.week || '3x5';
			$scope.max = $scope.max || '315';
			function updateTable() {
				var max = +$scope.max;
				var week = ''+$scope.week;
				$scope.sets = FiveThreeOneCalculator.generatePlateTable(max, week);
			}

			$scope.$watch('max', updateTable);
			$scope.$watch('week', updateTable);
		},
		scope: {'max':'=','week':'='}
	});
});
