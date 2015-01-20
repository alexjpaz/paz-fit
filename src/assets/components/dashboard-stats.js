angular.module('app').config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('dashboard-stats', {
		scope: {'stats': '=dashboardStats'},
	});
}); 
