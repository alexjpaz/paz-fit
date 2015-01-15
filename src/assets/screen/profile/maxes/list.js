angular.module('app').config(function(ScreenFactoryProvider) {
	var ScreenFactory = ScreenFactoryProvider.$get();
	ScreenFactory.build('screen-profile-maxes-list', function($scope, $routeParams, MaxesDao, $http) {

	var momentToday = moment();

	$scope. v = {
		today: moment().format('YYYY-MM-DD')
	};

	$scope.date = $routeParams.date; 

	var markIsDeload = function(max, i, maxes) {
		if(i !== 0) {
			var flag = false;

			flag |= max.press    <= maxes[i-1].press;
			flag |= max.deadlift <= maxes[i-1].deadlift;
			flag |= max.bench    <= maxes[i-1].bench;
			flag |= max.squat    <= maxes[i-1].squat;

			max.isDeload = !!flag;
		}
	};

	var markIncrement = function(max, i, maxes) {
		if(i === 0) return;

		var prevMax = maxes[i-1];

		max.increment = {
			press: 1 - (prevMax.press / max.press),
			deadlift: 1 - (prevMax.deadlift / max.deadlift),
			bench: 1 - (prevMax.bench / max.bench),
			squat: 1 - (prevMax.squat / max.squat),
		};
	};

	$scope.getMaxesList  = function() {
		var params = {'ordering': 'date'};
		MaxesDao.find(params).then(function(maxes) {

			angular.forEach(maxes, function(max,i) {
				markIsDeload(max, i, maxes);
				markIncrement(max, i, maxes);
			});

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

	$scope.calculateIncrement = function(lift, $index) {
		var cmx = $scope.maxes[$index][lift];
		var pmx = $scope.maxes[$index-1][lift];

		var caclulated = pmx / cmx;

		return caclulated;
	};

	$scope.isDeload = function(currentMax, $index) {
		if(!$scope.maxes) return; 
		var flag = false;

		var previousMax = $scope.maxes[$index -1];

		if(!!previousMax) {
			flag |= currentMax.press <= previousMax.press;
			flag |= currentMax.deadlift <= previousMax.deadlift;
			flag |= currentMax.bench <= previousMax.bench;
			flag |= currentMax.squat <= previousMax.squat;
		}

		return !!flag;
	};

	$scope.getMaxesList();
});

});
