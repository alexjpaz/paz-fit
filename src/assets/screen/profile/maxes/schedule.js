angular.module('app').config(function(ScreenFactoryProvider) {
	var ScreenFactory = ScreenFactoryProvider.$get();
	ScreenFactory.build('screen-profile-maxes-schedule', function($scope, $routeParams, MaxesDao, moment, $http) {

		$scope.v = {
			startDate: $routeParams.date || moment().format('YYYY-MM-DD'),
			cycles: 5
		};

		$scope.$watch('v', function(v) {
			$scope.projectedMaxes = [];

			for(var i=0;i<v.cycles;i++) {
				$scope.projectedMaxes.push({
					date: moment(v.startDate, 'YYYY-MM-DD').add(i, 'month').format('YYYY-MM-DD'),
					press: v.press + (5*i),
					deadlift: v.deadlift + (10*i),
					bench: v.bench + (5*i),
					squat: v.squat + (10*i)
				});
			}
		}, true);

		$scope.getMaxesList  = function() {
			MaxesDao.find().then(function(maxes) {
				$scope.maxesList = maxes;
			});
		};

		$scope.getMaxesList();

		$scope.save = function(projectedMaxes) {
			console.debug(projectedMaxes);
			$scope.request = {};

			var postData = {
				list: {
					Maxes: projectedMaxes
				}
			};

			$http.post('/rest/Maxes', postData).then(function() {
				$scope.request = {
					success: true,
				}
			}, function() {
				$scope.request = {
					error: true,
				}
			});
		};
	});

});
