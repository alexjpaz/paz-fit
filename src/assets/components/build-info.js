angular.module('app').config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('build-info', {
		controller: function($scope) {
		}
	});
}); 
