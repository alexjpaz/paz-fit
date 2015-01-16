angular.module('app').config(function($provide) {
	$provide.factory('ApplicationEnum', function() {
		function ApplicationEnum() {
			this.LIFT = ['press','deadlift','bench','squat'];
			this.WEEK = ['3x5','3x3','531','DL','1:1'];
			this.FRACTION = [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95];
			this.PR_ORDER_BY = ['-reps','-date','-weight'];

		}
		var instance = new ApplicationEnum();
		return instance;
	});
})
