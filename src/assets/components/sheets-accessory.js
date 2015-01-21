angular.module('app').config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('sheets-accessory', {
		scope: {
			'mdl': '=sheetsAccessory',
			'name': '@'
		}
	});
});
