angular.module('app').config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('each-max', {
		scope: {'eachMax':'='},
		replace: true,
		controller: function($scope) {
		}
	});
});
