angular.module('app').config(function(ComponentProvider) {

	ComponentProvider.register('block', {
		transclude: true,
		scope: {blockTitle:'@',cBlock:'@'},
		componentGroup: 'block',
		compile: function(element, attrs) {
			element.find('input').attr('name', 'butt');
		}
	});
});
