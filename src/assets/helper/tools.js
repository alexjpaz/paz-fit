angular.module('app')
.config(function($provide) {

	$provide.factory('jQuery', function() {
		return jQuery;
	});

	$provide.factory('d3', function() {
		return d3;
	});

	$provide.service('LiftProgressionChain', function() {
		var steps = [0.85,0.9,0.95];

		this.nextStep = function(currentStep) {
			var step = null;
			for(var i=0;i<steps.length;i++) {
				if(currentStep >= steps[i]) {
					step = steps[(i+1)%steps.length];
				}
			}
			return step;
		};
	});

	$provide.service('LiftProgressionChain', function() {
		var chain = ['press','deadlift','bench','squat'];

		this.next = function(lift) {
			var nextLift = null;

			var liftIndex = chain.indexOf(lift);

			nextLift = chain[(liftIndex + 1) % chain.length];

			return nextLift;
		};
	});

	$provide.service('FiveThreeOneCalculator', function(moment) {
		this.max = function(weight, reps) {
			var max = (weight*reps*0.0333 + weight);
			return max;
		};

		this.roundTo = function(value, step) {
			return Math.round(value / step) * step;
		};

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
				'DL': [0.4,0.5,0.6],
				'1:1': [1]
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

		this.roundToNearestPlate = function(weight) {
			return Math.round(weight / 5) * 5;
		};

		this.getEffectiveMax = function(prDate, orderedMaxes) {
			var effectiveMax = null; 

			angular.forEach(orderedMaxes, function(om) {
				if(effectiveMax != null) {
					return
				}
				var omDate = moment(om.date, 'YYYY-MM-DD');
				var prDate = moment(prDate, 'YYYY-MM-DD');

				if(!omDate.isAfter(prDate)) {
					effectiveMax = om;
				}
			});
			
			return effectiveMax;
		};
	});

})
.config(function($provide) {

})
.config(function($provide) {
	$provide.factory('moment', function() {
		var momentConfig = moment;
		return momentConfig;
	});
});
