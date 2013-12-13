App.lazy.ScreenFactory('screen-profile-main', function($scope, Database, DatastoreSync, CalendarEventRepository) {
	$scope.events = new CalendarEventRepository();

	$scope.getProfileData = function() {
		Database.from('Maxes').list(1).done(function(records) {
			$scope.currentMaxes = records[0];
			$scope.$apply();
		});

		Database.from('PersonalRecord').list().done(function(records) {
			angular.forEach(records, function(record) {
				$scope.events.put(record.date, record.lift+" "+record.weight+"x"+record.reps);
			});
			$scope.$apply();
		});
	};

	$scope.getProfileData();

	$scope.sync = function() {
		DatastoreSync.sync();
	};
	$scope.clear = function() {
		Database.clear();
	};
});
