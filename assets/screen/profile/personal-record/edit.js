angular.module('app').lazy.ScreenFactory('screen-profile-personal-record-edit', function($scope, $routeParams, Database, DatastoreSync) {
	$scope.date = $routeParams.date; 

	$scope.getPersonalRecord  = function() {
		var promise = Database.get('PersonalRecord', $scope.date)
		
		promise.done(function(record) {
			if(angular.isDefined(record)) {
				$scope.dto = record;
			} else {
				$scope.dto = {
					date: $scope.date
				};
			}
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
