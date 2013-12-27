angular.module('app').lazy.ScreenFactory('screen-profile-main', function($scope, Database, DatastoreSync, CalendarEventRepository) {
	$scope.events = new CalendarEventRepository();

	$scope.getProfileData = function() {

		$scope.events.clear();

		Database.from('Maxes').list(1).done(function(records) {
			$scope.currentMaxes = records[0]
			$scope.uriEncodedMaxes = $.param({
				p: $scope.currentMaxes.press,
				d: $scope.currentMaxes.deadlift,
				b: $scope.currentMaxes.bench,
				s: $scope.currentMaxes.squat,
			});
			$scope.$apply();
		});

		Database.from('Maxes').list().done(function(records) {
			angular.forEach(records, function(record) {
				var event  = new Object();
				event.label = [record.press, record.deadlift, record.bench, record.squat].join('-');
				event.href = '#/profile/maxes/edit?date='+record.date;
				event.type = 'Maxes';
				$scope.events.put(record.date, event);
			});
			$scope.$apply();
		});

		Database.from('PersonalRecord').list().done(function(records) {
			angular.forEach(records, function(record) {
				var event  = new Object();
				event.label = record.lift+" "+record.weight+"x"+record.reps; 
				event.href = '#/profile/personal-record/edit?date='+record.date;
				event.type = 'PersonalRecord';
				$scope.events.put(record.date, event);
			});
			$scope.$apply();
		});
	};

	$scope.getProfileData();
});
