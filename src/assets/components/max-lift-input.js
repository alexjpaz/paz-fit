angular.module('app').config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('max-lift-input', {
		scope: {'mdl':'=maxLiftInput'},
		controller: function($scope) {
			$scope.adjust = function(amount) {
				$scope.mdl += (5 * Math.round($scope.mdl*amount/5));
			};
		}
	});
});
