angular.module('app').lazy.ScreenFactory('screen-profile-maxes-edit', function($scope, $routeParams, Database) {
	$scope.date = $routeParams.date; 

	$scope.getPersonalRecord  = function() {
		var promise = Database.get('PersonalRecord', $scope.date)
		
		promise.done(function(record) {
			$scope.dto = record;
			$scope.$apply();
		});
	};

	$scope.saveChanges = function() {
		var promise = Database.put('PersonalRecord', $scope.dto);
	};

	$scope.getPersonalRecord();
});
