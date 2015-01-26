angular.module('app').directive('enum', function() {
	return {
		controller: function($scope, ApplicationEnum) {
			$scope.ApplicationEnum = ApplicationEnum;
		}
	};
});
