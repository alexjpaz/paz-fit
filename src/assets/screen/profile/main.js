angular.module('app').config(function(ScreenFactoryProvider) {
	var ScreenFactory = ScreenFactoryProvider.$get();
	ScreenFactory.build('screen-profile-main', function($scope, PersonalRecordDao, MaxesDao, CalendarEventRepository, CalendarUtils, FiveThreeOneCalculator, $location, $http, $q) {
	$scope.events = new CalendarEventRepository();

	$scope.roundTo = function(value, step) {
		return FiveThreeOneCalculator.roundTo(value, step);
	};

	$scope.repgoal = function(max, fraction) {
		return FiveThreeOneCalculator.repgoal(max, max*fraction);
	};

	$scope.maxFraction = function(max, fraction) {
		return FiveThreeOneCalculator.roundToNearestPlate(max * fraction);
	};

	$scope.v = {
		statsView: "latest",
	};

	$scope.getProfileData = function() {
		$scope.events.clear();

		var dateRange = CalendarUtils.getCalendarRangeForToday();

		var future = {
			calendar: {}
		};

		future.calendar.pr = PersonalRecordDao.fetchFromDateRange(dateRange.begin,dateRange.end).then(function(records) {
			angular.forEach(records, function(record) {
				var event  = {};
				event.label = record.lift+" "+record.weight+"x"+record.reps; 
				event.href = '#/profile/personal-record/edit?key='+record.key;
				event.type = 'PersonalRecord';
				$scope.events.put(record.date, event);
			});
		});

		future.calendar.maxes = MaxesDao.fetchFromDateRange(dateRange.begin,dateRange.end).then(function(records) {
			angular.forEach(records, function(record) {
				var event  = {};
				event.label = [record.press, record.deadlift, record.bench, record.squat].join('-');
				event.href = '#/profile/maxes/edit?key='+record.key;
				event.type = 'Maxes';
				$scope.events.put(record.date, event);
			});
		});

		future.calendar.effectiveMax = MaxesDao.findEffective().then(function(effectiveMax) {
			$scope.effectiveMax = effectiveMax;
		});

		$q.all(future.calendar).then(function() {
			$scope.isReadyCalendar = true;
		});

		MaxesDao.findLatest().then(function(records) {
			var currentMaxes = null;
			if(!!records[0]) {
				$scope.currentMaxes = currentMaxes = records[0];
				$scope.uriEncodedMaxes = $.param({
					p: currentMaxes.press,
					d: currentMaxes.deadlift,
					b: currentMaxes.bench,
					s: currentMaxes.squat,
				});
			}
		});

		$http.get('/api/stats').then(function(rsp) {
			$scope.stats = rsp.data;
		});
	};

	$scope.selectDay = function(day) {
		$location.path('/profile/note/edit')
		$location.search('date',day.date.format('YYYY-MM-DD'));
	};

	$scope.getProfileData();
});
});
