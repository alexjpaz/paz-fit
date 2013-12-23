angular.module('app').lazy.ScreenFactory('screen-profile-main', function($scope, Database, DatastoreSync, CalendarEventRepository) {
	$scope.events = new CalendarEventRepository();

	$scope.getProfileData = function() {
		Database.from('Max').list(1).done(function(records) {
			$scope.currentMaxes = records[0];
			$scope.$apply();
		});

		Database.from('PersonalRecord').list().done(function(records) {
			angular.forEach(records, function(record) {
				var event  = new Object();
				event.label = record.lift+" "+record.weight+"x"+record.reps; 
				event.href = '#/profile/personal-record/edit?date='+record.date;
				$scope.events.put(record.date, event);
			});
			$scope.$apply();
		});
	};

	$scope.getProfileData();
});
