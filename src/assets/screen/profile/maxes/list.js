angular.module('app').config(function(ScreenFactoryProvider) {
	var ScreenFactory = ScreenFactoryProvider.$get();
	ScreenFactory.build('screen-profile-maxes-list', function($scope, $routeParams, MaxesDao, $http) {

	var momentToday = moment();

	$scope. v = {
		today: moment().format('YYYY-MM-DD')
	};

	$scope.date = $routeParams.date; 

	$scope.getMaxesList  = function() {
		var params = {'ordering': 'date'};
		MaxesDao.find(params).then(function(maxes) {
			$scope.maxes = maxes;
		});
	};

	$scope.remove = function(maxes) {
		$http.delete('/rest/Maxes/'+maxes.key).then(function() {
			$scope.getMaxesList();
		});
	};

	$scope.isFutureMax = function(mx) {
		var flag = false;

		flag = momentToday.isBefore(mx.date);

		return flag;
	};

	$scope.getMaxesList();
});

});
