angular.module('app').config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('spinner', {
		transclude: true,
		scope: { on: '='},
		controller: function($scope, $q) {
		}
	});
});
