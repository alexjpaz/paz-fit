angular.module('app').config(function(AppConfig, $locationProvider) {
	if(AppConfig.html5mode) {
		$locationProvider.html5Mode(true);
	}
});
