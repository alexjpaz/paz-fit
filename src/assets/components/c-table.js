angular.module('app').config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('c-table', {
			scope: {'data':'=','item':'='},
			controller: function($scope) {
			}
	});
}); 
