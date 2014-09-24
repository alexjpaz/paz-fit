angular.module('app').config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('max-group', {
		scope: {'maxGroup':'='},
		controller: function($scope) {
		}
	});
});
