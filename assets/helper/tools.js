RootApp.config(function($provide) {
	$provide.service('FiveThreeOneCalculator', function() {
		this.repgoal = function(max, weight) {
			weight = parseInt(weight);
			max = parseInt(max);
			//increment = parseInt(increment);
			
			var goal = Math.round(37-36*weight/(max+5));
			
			return goal;
		};
	});
});
