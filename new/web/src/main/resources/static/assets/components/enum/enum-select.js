angular.module('app').config(function(ComponentProvider) {

	
	ComponentProvider.register('enum-select', {
		replace: true,
		scope: {'ngModel':'=', 'enumSelect':'@'},
		controller: function($scope, ApplicationEnum) {
			$scope.ApplicationEnum = ApplicationEnum;
		}

	});
	
});
