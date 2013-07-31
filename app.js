var app = angular.module('app', []);

app.directive('woMonth', function() {
	
});

app.directive('woWeek', function() {
	return {
		restrict: 'EA',
		templateUrl: '/assets/partials/wo-week.html',
		controller: function($scope, PlateCalculator) {
			$scope.table = PlateCalculator.generateTable(180, '531');
		}
	}
});

app.directive('woDay', function() {
	return {
		restrict: 'EA',
		scope: {'oneRepMax':'=','week':'='},
		templateUrl: '/assets/partials/wo-day.html',
		controller: function($scope, PlateCalculator) {
			$scope.table = PlateCalculator.generateTable($scope.oneRepMax, $scope.week);
		}
	}
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
	    '5x3': [0.4,0.5,0.6,config.bbb,0.65,0.75,0.85],
	    '3x3': [0.4,0.5,0.6,config.bbb,0.7,0.8,0.9],
	    '531': [0.4,0.5,0.6,config.bbb,0.75,0.85,0.95],
	    'DL': [0.4,0.5,0.6,config.bbb,0.4,0.5,0.6]
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