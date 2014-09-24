angular.module('app').config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('pr-list-delta', function($scope, $attrs, FiveThreeOneCalculator, $filter, moment) {
		$scope.estMax = function(pr) {
			return FiveThreeOneCalculator.max(pr.weight, pr.reps);
		};

		var maxes = {};
		var list = {};
		var orderedMaxes = null;

		function getEffectiveMax(pr) {
			var effectiveMax = null; 

			angular.forEach(orderedMaxes, function(om) {
				if(effectiveMax != null) {
					return
				}
				var omDate = moment(omDate, 'YYYY-MM-DD');
				var prDate = moment(pr.date, 'YYYY-MM-DD');

				if(!omDate.isAfter(prDate)) {
					effectiveMax = om;
				}
			});
			
			orderedMaxes[0][pr.lift];
			return effectiveMax;
		}

		function updateView() {
			if(angular.isUndefined(maxes) || angular.isUndefined(list)) return;
			angular.forEach(list, function(li) {
				var effectiveMax = getEffectiveMax(li);

				console.group('updateview');
				li.calc = {};
				li.calc.repTarget = FiveThreeOneCalculator.repgoal(+effectiveMax, +li.weight);
				li.calc.estimatedMax = FiveThreeOneCalculator.max(li.weight, li.reps);
				li.calc.targetMax = FiveThreeOneCalculator.max(li.weight, li.calc.repTarget);
				li.calc.effectiveMax = effectiveMax;

				console.debug(li);
				console.debug(maxes);
				console.debug(effectiveMax);
				console.debug(li.calc);

				console.groupEnd();
			});
							
			$scope.list = list;

			$scope.list = list;
			$scope.maxes = maxes;
		}

		$scope.$watch($attrs.prListDelta, function(scope_list) {
			list = scope_list;	
			updateView();
		});

		$scope.$watch($attrs.pMaxes, function(pMaxes) {
			maxes = pMaxes;	
			orderedMaxes = $filter('orderBy')(maxes, 'date');
			updateView();
		});

		$scope.highlight = function(pr) {
			$scope.$emit('screen-profile-personal-record-list__highlight-pr', pr);
		};
	});
});
