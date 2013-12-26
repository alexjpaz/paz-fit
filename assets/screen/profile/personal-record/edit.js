angular.module('app').lazy.ScreenFactory('screen-profile-maxes-edit', function($scope, $routeParams, Database, DatastoreSync) {
	$scope.date = $routeParams.date; 

	$scope.getPersonalRecord  = function() {
		var promise = Database.get('PersonalRecord', $scope.date)
		
		promise.done(function(record) {
			$scope.dto = record;
			$scope.$apply();
		});
	};

	$scope.saveChanges = function() {
		var promise = Database.put('PersonalRecord', $scope.dto).done(function() {
			DatastoreSync.push();
		});
	};

	$scope.getPersonalRecord();
});
