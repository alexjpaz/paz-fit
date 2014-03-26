angular.module('app').config(function(ScreenFactoryProvider) {
	var ScreenFactory = ScreenFactoryProvider.$get();
	ScreenFactory.build('screen-profile-graph-index', function($scope, $routeParams, PersonalRecordDao, moment, FiveThreeOneCalculator, $location, MaxesDao, moment) {
		var each = angular.forEach;

		$scope.records = {};
		$scope.params = [
			{'feq_lift': 'deadlift','ordering': '-date'},
			{'feq_lift': 'bench','ordering': '-date'},
			{'feq_lift': 'squat','ordering': '-date'},
			{'feq_lift': 'press','ordering': '-date'},
		];

		$scope.getPersonalRecords  = function(params) {
			PersonalRecordDao.find(params).then(function(records) {
				$scope.records[params.feq_lift] = records;
			});
		};

		$scope.getMaxes = function(params) {
			MaxesDao.find(params).then(function(maxes) {
				$scope.maxes = maxes;
				console.debug(maxes);
			});
		};

		each($scope.params, function(param) {
			$scope.getPersonalRecords(param);
		});

		$scope.getMaxes({
			'ordering': '-date'
		});

		$scope.$on('prGraph.select', function($event, r, clickEvent) {
			$location.path('/profile/personal-record/edit')
			$location.search('date', moment(r.date).format('YYYY-MM-DD'));
		});
	});

});
