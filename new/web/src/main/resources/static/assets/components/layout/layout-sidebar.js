angular.module('app').config(function(ComponentProvider) {
	ComponentProvider.register('layout-sidebar',{
		componentGroup: 'layout',
		replace: true,
		controller: function(DefaultNavaigationConfiguration, $scope) {
			$scope.nav = DefaultNavaigationConfiguration;
		}
	});
});
