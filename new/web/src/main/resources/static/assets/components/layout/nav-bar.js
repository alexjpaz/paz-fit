angular.module('app').config(function(ComponentProvider) {
	ComponentProvider.register('nav-bar',{
		componentGroup: 'layout',
		replace: true,
		controller: function(TopNavigation, $scope) {
			$scope.nav = TopNavigation;
		}
	});
});
