angular.module('app').config(function(ScreenFactoryProvider) {
	var ScreenFactory = ScreenFactoryProvider.$get();
	ScreenFactory.build('screen-profile-personal-record-list', function($scope, $routeParams, PersonalRecordDao, moment, FiveThreeOneCalculator, $location, MaxesDao) {
	$scope.date = $routeParams.date || moment().format('YYYY-MM-DD'); 
	$scope.isNew = $routeParams.isNew;

	$scope.dto = {
		date: $scope.date,
		reps: 5
	};

	$scope.v = {
		pane: 'List'
	};

	$scope.params = {}

	angular.forEach($location.search(), function(value, key) {
		$scope.params[key] = value;
	});

	$scope.getPersonalRecords  = function(params) {
		PersonalRecordDao.find(params).then(function(records) {
			$scope.records = records;
		});

		MaxesDao.find({}).then(function(maxes) {
			$scope.dto.maxes = maxes;
		});
		
	};

	$scope.$watch('params', $scope.getPersonalRecords, true);
	$scope.$watch('params', function(params) {
		angular.forEach(params, function(value, key) {
			$location.search(key, value);
		});
	}, true);

	var highlighedPr = null;
	$scope.$on('screen-profile-personal-record-list__highlight-pr', function(e, pr) {
		if(highlighedPr != null) {
			highlighedPr.$highlight = false;
		}
		pr.$highlight = true;
		highlighedPr = pr;
	});
});

});
