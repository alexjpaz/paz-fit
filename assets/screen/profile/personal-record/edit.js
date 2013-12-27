angular.module('app').lazy.ScreenFactory('screen-profile-personal-record-edit', function($scope, $routeParams, Database, DatastoreSync, moment) {
	$scope.date = $routeParams.date || moment().format('YYYY-MM-DD'); 
	$scope.isNew = $routeParams.isNew;

	$scope.dto = {
		date: $scope.date,
		reps: 5
	};

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

	if(!$scope.isNew) {
		$scope.getPersonalRecord();
	}
});
