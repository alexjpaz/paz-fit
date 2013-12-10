angular.module('app').config(function($provide) {
	$provide.factory('ApplicationEnum', function($rootScope) {
		function ApplicationEnum() {
			this.LIFT = ['press','deadlift','bench','squat'];
			this.WEEK = ['3x5','3x3','531','DL'];
			this.FRACTION = [0.6,0.65,0.7,0.75,0.8,0.85,0.9,0.95];

		}
		var instance = new ApplicationEnum();
		$rootScope.ApplicationEnum = instance;
		return instance;
	});
})
