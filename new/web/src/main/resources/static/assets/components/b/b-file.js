angular.module('app').config(function(ComponentProvider) {
	ComponentProvider.register('b-file', {
		componentGroup: 'b',
		replace: true,
		scope: {
			'onSelect': '&bFile'
		},
		link: function(scope, element) {
			var fel = element.find('input');
			element.find('a').bind('click', function(e) {
				fel.click();
			});
		}
	});
});
