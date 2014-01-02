angular.module('app').config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('pr-list', function($scope, $attrs, Database) {
		$scope.$watch($attrs.prList, function(list) {
			$scope.list = list;
		});
	});
});
