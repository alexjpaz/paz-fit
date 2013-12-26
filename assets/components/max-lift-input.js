angular.module('app').config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('max-lift-input', {
		compile: function() {
			alert('hi');
		}
	});
});
