angular.module('app').config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('dashboard-events', {
		scope: false
	});
}); 
