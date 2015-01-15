angular.module('app').config(function(ScreenFactoryProvider) {
	var ScreenFactory = ScreenFactoryProvider.$get();
	ScreenFactory.build('screen-profile-maxes-schedule', function($scope, $routeParams, MaxesDao, moment, $http, $window, $q) {


		$scope.v = {
			startDate: $routeParams.date || moment().format('YYYY-MM-DD'),
			press: +$routeParams.press,
			deadlift: +$routeParams.deadlift,
			bench: +$routeParams.bench,
			squat: +$routeParams.squat,
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

		var checkForFutureMaxes = function() {
			var deffered = $q.defer();

			MaxesDao.find({
				"fge_date": $scope.v.startDate
			}).then(function(records) {
				if(records.length > 0) {
					if($scope.v.deleteFutureMaxes) {
						var promises = [];

						angular.forEach(records, function(max) {
							promises.push($http.delete('/rest/Maxes/'+max.key));
						});


						$q.all(promises).then(function() {
							deffered.resolve();
						}, function() {
							deffered.reject();
						});
					} else {
						deffered.reject();
					}
				} else {
					deffered.resolve();
				}
			});

			return deffered.promise;
		};

		var deleteFutureMaxes = function() {
		};

		$scope.save = function(projectedMaxes) {
			checkForFutureMaxes().then(function() {
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

			}, function(reason) {
				$window.alert(reason);
			});
		};
	});

});
