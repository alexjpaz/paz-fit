angular.module('app').config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('pr-list', function($scope, $attrs, FiveThreeOneCalculator) {
		$scope.estMax = function(pr) {
			return FiveThreeOneCalculator.max(pr.weight, pr.reps);
		};

		$scope.$watch($attrs.prList, function(list) {
			$scope.list = list;
		});

		$scope.highlight = function(pr) {
			$scope.$emit('screen-profile-personal-record-list__highlight-pr', pr);
		};
	});
});
