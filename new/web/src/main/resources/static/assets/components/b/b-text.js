angular.module('app').config(function(ComponentProvider) {
	ComponentProvider.register('b-text', {
		componentGroup: 'b',
		replace: true,
		scope: {
			model: '=',
			name: '@'	
		},
		link: function(scope, element, attrs) {
			var formName = element.parent('form').attr('name');
			scope.form = scope.$parent[formName];
		}
	});
});
