angular.module('app').config(function(ScreenFactoryProvider) {
	var ScreenFactory = ScreenFactoryProvider.$get();
	ScreenFactory.build('screen-tools-wilks', function($scope, FiveThreeOneCalculator, PersonalRecordDao) {
		$scope.m = {
			weight: 900,
			bodyweight: 200,
			lift: {
				bench: 0,
				squat: 0,
				deadlift: 0
			}
		};

		function update() {
			$scope.m.output = wilks($scope.m.weight, $scope.m.bodyweight);
		}

		function wilks(weight, bodyweight) {
			var a=-216.0475144,
			b=+16.2606339,
			c=-0.002388645,
			d=-0.00113732,
			e=+7.01863E-06,
			f=-1.291E-08;

			weight = (weight/2.2);
			bodyweight = (bodyweight/2.2);

			function x(pow){
				return Math.pow(bodyweight, pow);
			}

			var coeff = (500)/(a+(b*x(1))+(c*x(2))+(d*x(3))+(e*x(4))+(f*x(5)));

			return weight*coeff;
		}

		params = [
			{'feq_lift': 'deadlift','ordering': '-date'},
			{'feq_lift': 'bench','ordering': '-date'},
			{'feq_lift': 'squat','ordering': '-date'},
		];

		angular.forEach(params, function(param) {
			var lift = params.feq_lift;
			PersonalRecordDao.find(param).then(function(records) {
				if(angular.isUndefined(records)) return;
				var r = records[0];
				if(r) {
					var max = FiveThreeOneCalculator.max(r.weight, r.reps);
					$scope.m.lift[r.lift] = max;
				}
			});
		});


		$scope.$watch('m.weight', update);
		$scope.$watch('m.bodyweight', update);
		$scope.$watch('m.lift', function(l) {
			if(angular.isUndefined(l)) return;
			$scope.m.weight = (l.deadlift+l.bench+l.squat);
		}, true);
	});


});
