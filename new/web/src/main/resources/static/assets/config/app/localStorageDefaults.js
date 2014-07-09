angular.module('app').config(function($provide) {
	var StorageAppConfig = null;

	try {
		StorageAppConfig = JSON.parse(localStorage.getItem('AppConfig'));
	} catch(e) {
		StorageAppConfig = {};
	}

	$provide.constant('StorageAppConfig', StorageAppConfig);
});
