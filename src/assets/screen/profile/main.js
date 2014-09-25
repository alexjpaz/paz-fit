angular.module('app').config(function(ScreenFactoryProvider) {
	var ScreenFactory = ScreenFactoryProvider.$get();
	ScreenFactory.build('screen-profile-main', function($scope, PersonalRecordDao, MaxesDao, CalendarEventRepository, CalendarUtils, FiveThreeOneCalculator, $location) {
	$scope.events = new CalendarEventRepository();

	$scope.repgoal = function(max, fraction) {
		return FiveThreeOneCalculator.repgoal(max, max*fraction);
	};

	$scope.maxFraction = function(max, fraction) {
		return FiveThreeOneCalculator.roundToNearestPlate(max * fraction);
	};

	$scope.getProfileData = function() {
		$scope.events.clear();

		var dateRange = CalendarUtils.getCalendarRangeForToday();

		PersonalRecordDao.fetchFromDateRange(dateRange.begin,dateRange.end).then(function(records) {
			angular.forEach(records, function(record) {
				var event  = new Object();
				event.label = record.lift+" "+record.weight+"x"+record.reps; 
				event.href = '#/profile/personal-record/edit?key='+record.key;
				event.type = 'PersonalRecord';
				$scope.events.put(record.date, event);
			});
		});

		MaxesDao.fetchFromDateRange(dateRange.begin,dateRange.end).then(function(records) {
			angular.forEach(records, function(record) {
				var event  = new Object();
				event.label = [record.press, record.deadlift, record.bench, record.squat].join('-');
				event.href = '#/profile/maxes/edit?key='+record.key;
				event.type = 'Maxes';
				$scope.events.put(record.date, event);
			});
		});

		MaxesDao.findLatest().then(function(records) {
			$scope.currentMaxes = records[0];
			$scope.uriEncodedMaxes = $.param({
					p: $scope.currentMaxes.press,
					d: $scope.currentMaxes.deadlift,
					b: $scope.currentMaxes.bench,
					s: $scope.currentMaxes.squat,
			});
		});
	};

	$scope.selectDay = function(day) {
		$location.path('/profile/note/edit')
		$location.search('date',day.date.format('YYYY-MM-DD'));
	};

	$scope.getProfileData();
});
});
