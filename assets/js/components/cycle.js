(function(angular){

var app = angular.module('components/cycle', ['utils/factory']);

app.config(function(componentFactoryProvider) {
	ComponentFactory = componentFactoryProvider.$get();
	
	ComponentFactory.config.templateUrlBase = 'components/wo';
	
	ComponentFactory.build('wo-app');
	
	ComponentFactory.build('wo-lifts', function($scope, OneRepMax, $location, $rootScope) {
		$scope.lifts = OneRepMax;
		
		$scope.incrementLife = function(liftKey, amount) {
			$scope.lifts[liftKey] = parseInt($scope.lifts[liftKey]) + amount;
		};
		
		$scope.nextCycle = function() {
			$scope.incrementLife('Press', 5);
			$scope.incrementLife('Bench', 5);
			$scope.incrementLife('Squat', 10);
			$scope.incrementLife('Deadlift', 10);
		};
		
		$scope.prevCycle = function() {
			$scope.incrementLife('Press', -5);
			$scope.incrementLife('Bench', -5);
			$scope.incrementLife('Squat', -10);
			$scope.incrementLife('Deadlift', -10);
		};
		
		$scope.$watch('lifts', function(newOneRepMax) {
			$location.search(newOneRepMax);
			$rootScope.$broadcast('woLifts.updateLifts', newOneRepMax);
		}, true);
	});
	
	ComponentFactory.build('wo-month', function($scope, OneRepMax) {
		$scope.OneRepMax = OneRepMax;
	});
	
	ComponentFactory.build('wo-week', function($scope, $attrs) {
		$scope.week = $attrs.week;
	});

	ComponentFactory.build('wo-day', function($scope, $attrs, PlateCalculator, OneRepMax, RepGoalCalculator, $rootScope) {
		$scope.lift = $attrs.week;
		$scope.$watch($attrs.week, function(week) {
			$scope.week = week;
			console.log(week);
		});
		
		$scope.oneRepMax = OneRepMax[$attrs.lift]
		
		$scope.rowClass = [];
		if($scope.week == 'DL') {
			$scope.rowClass[0] = 'wo-day__warm-up';
			$scope.rowClass[1] = 'wo-day__warm-up';
			$scope.rowClass[2] = 'wo-day__bbb';
		} else {
			$scope.rowClass[0] = 'wo-day__work-set';
			$scope.rowClass[1] = 'wo-day__work-set';
			$scope.rowClass[2] = 'wo-day__work-set';
		}
		
		$rootScope.$on('woLifts.updateLifts', function(event, newOneRepMax) {
			$scope.oneRepMax = newOneRepMax[$attrs.lift];
		})
		
		$scope.$watch('oneRepMax', function() {
			$scope.table = PlateCalculator.generateTable($scope.oneRepMax, $scope.week);
			
			$scope.repGoal = RepGoalCalculator.goalFromWeekAndLift($scope.oneRepMax, $scope.week);;
		});
	});

});





app.factory('OneRepMax', function($location, NumberUtil) {
	
	var OneRepMaxSingleton = null;
	
	function OneRepMax() {
		var lifts = $location.search();
		angular.forEach(['Press','Deadlift','Bench','Squat'], function(liftKey) {
			this[liftKey] = lifts[liftKey];
		}, this);
	}
	
	function OneRepMaxManager() {
		this.get = function() {
			return OneRepMaxSingleton;
		};
	}
	
	var OneRepMaxSingleton = new OneRepMax();
	
	return OneRepMaxSingleton;
});

app.service('NumberUtil', function (){
});

app.service('RepGoalCalculator', function() {
	var weekMap = {
		'5x3' : 0.85,
		'3x3' : 0.9,
		'531' : 0.95,
		'DL' : 0.6
	};
	
	
	this.goalFromWeekAndLift = function(oneRepMax, week) {
		var weight = Math.round(oneRepMax*weekMap[week] / 5) * 5;
		return this.goalFromWeightAndMax(weight, oneRepMax, 5);
		
	};
	this.goalFromWeightAndMax = function(weight, onerep, increment) {
		weight = parseInt(weight);
		onerep = parseInt(onerep);
		increment = parseInt(increment);
		
		var goal = Math.round(37-36*weight/(onerep+5));

		
		return goal;
	};
});

app.factory('PlateCalculator', function() {
	var config = {
			  bar: 45,
			  bbb: 0.6,
			};


	function calculatePlates(weight) {
	  var bar = 45;
	  
	  var onePlate = [0,0,0,0,0,0];
	  var plates = [45,35,25,10,5,2.5];
	  
	  weight = weight - 45;
	  
	  for(var i=0;i<plates.length;i++) {
	    onePlate[i] = Math.floor((weight / (plates[i])) / 2);
	    if(onePlate[i] > 0) {
	      weight = (weight - (onePlate[i]*plates[i]*2));
	    }
	  }
	  
	  return onePlate;
	}

	function generateTable(repmax, week) {
	  
	  var weekMap = {
	    '5x3': [0.65,0.75,0.85],
	    '3x3': [0.7,0.8,0.9],
	    '531': [0.75,0.85,0.95],
	    'DL': [0.4,0.5,0.6]
	  };
	  
	  var pcents = weekMap[week];
	  var weight = 0;
	  var rows = [];
	  
	  for(var i=0;i<pcents.length;i++) {
	    weight = Math.round(repmax*pcents[i] / 5) * 5;
	    var row = calculatePlates(weight);
	    row.unshift(weight);
	    row.unshift(pcents[i]);
	    rows.push(row);
	  }
	  
	  return rows;
	}
	
	function PlateCalculator() {
		this.generateTable = generateTable;
	}
	
	
	return new PlateCalculator();
});

})(angular);