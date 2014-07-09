angular.module('app').config(function($provide) {
	$provide.factory('AppConfigStorage', function(Storage) {
		var s = Storage.getInstance('AppConfig');
		return s;
	});

	$provide.factory('User', function(Storage) {
		var s = Storage.getInstance('AppConfig');
		return s;
	});
});
