angular.module('app').config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('tab', {
		controller: function($scope, $attrs) {
		}
	});
});
