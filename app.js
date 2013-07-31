var app = angular.module('app', []);


app.directive('woLifts', function (){
	return {
		restrict: 'EA',
		templateUrl: '/assets/partials/wo-lifts.html',
		controller: function($scope, $location) {
			$scope.lifts = $location.search();
			
			$scope.$watch('lifts', function(value) {
				$location.search(value);
			}, true);
		}
	}
});

app.directive('woMonth', function() {
	return {
		restrict: 'EA',
		templateUrl: '/assets/partials/wo-month.html',
		controller: function($scope) {

		}
	}
});

app.directive('woWeek', function() {
	return {
		restrict: 'EA',
		templateUrl: '/assets/partials/wo-week.html',
		scope: {'week':'@'},
		controller: function($scope) {

		}
	}
});

app.directive('woDay', function() {
	return {
		restrict: 'EA',
		scope: {'week':'=', 'lift':'@'},
		templateUrl: '/assets/partials/wo-day.html',
		controller: function($scope, $attrs, PlateCalculator, OneRepMax) {
			$scope.oneRepMax = OneRepMax[$attrs.lift]
			$scope.table = PlateCalculator.generateTable($scope.oneRepMax, $scope.week);
			
			$scope.rowClass = [];
			$scope.rowClass[0] = 'wo-day__warm-up';
			$scope.rowClass[1] = 'wo-day__warm-up';
			$scope.rowClass[2] = 'wo-day__bbb';
			$scope.rowClass[3] = 'wo-day__work-set';
			$scope.rowClass[4] = 'wo-day__work-set';
			$scope.rowClass[5] = 'wo-day__work-set';
		}
	}
});

app.factory('OneRepMax', function($location) {
	return $location.search();
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
	    '5x3': [0.4,0.5,0.6,0.65,0.75,0.85],
	    '3x3': [0.4,0.5,0.6,0.7,0.8,0.9],
	    '531': [0.4,0.5,0.6,0.75,0.85,0.95],
	    'DL': [0.4,0.5,0.6,0.4,0.5,0.6]
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