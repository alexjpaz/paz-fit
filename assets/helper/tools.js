angular.module('app').config(function($provide) {
	$provide.service('FiveThreeOneCalculator', function() {
		this.repgoal = function(max, weight) {
			weight = parseInt(weight);
			max = parseInt(max);
			//increment = parseInt(increment);

			var goal = Math.round(37-36*weight/(max+5));

			return goal;
		};

		this.plates = function(weight) {
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
		};

		this.generatePlateTable = function(repmax, week) {
			var weekMap = {
				'3x5': [0.65,0.75,0.85],
				'3x3': [0.7,0.8,0.9],
				'531': [0.75,0.85,0.95],
				'DL': [0.4,0.5,0.6]
			};

			var pcents = weekMap[week];
			var weight = 0;
			var rows = [];

			for(var i=0;i<pcents.length;i++) {
				weight = Math.round(repmax*pcents[i] / 5) * 5;
				var row = this.plates(weight);
				row.unshift(weight);
				row.unshift(pcents[i]);
				rows.push(row);
			}

			return rows;
		};
	});
})
.config(function($provide) {
	$provide.factory('moment', function() {
		var momentConfig = moment;
		return momentConfig;
	});
});
