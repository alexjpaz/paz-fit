angular.module('app').config(function(ComponentProvider) {
	ComponentProvider.register('b-stats', {
		componentGroup: 'b',
		replace: true,
		scope: {
			'icon':'@',
			'text':'@',
			'value':'=',
		}
	});
});
