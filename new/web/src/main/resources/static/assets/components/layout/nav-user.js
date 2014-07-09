angular.module('app').config(function(ComponentProvider) {




	ComponentProvider.register('nav-user', {
			componentGroup: 'layout',
			controller: function($scope, Security) {
				$scope.Security = Security;
			}
	});
});
