angular.module('app').config(function($provide) {
	$provide.factory('ApplicationEnum', function($rootScope) {
		function ApplicationEnum() {
			this.LIFT = ['press','deadlift','bench','squat'];
			this.WEEK = ['3x5','3x3','531','DL'];

		}
		var instance = new ApplicationEnum();
		$rootScope.ApplicationEnum = instance;
		return instance;
	});
})
