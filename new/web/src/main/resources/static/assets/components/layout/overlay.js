angular.module('app').config(function(ComponentProvider) {
	ComponentProvider.register('overlay', {
			componentGroup: 'layout',
			replace: true,
			controller: function($scope, $rootScope, $element) {
				$rootScope.$on('cOverlay.dropdown', function(event, dropdownNameMenuElement) {
					$element.append(dropdownNameMenuElement);
				});
			}
	});
});
