angular.module('app').config(function($provide, $injector) {
	var sources = ['DefaultAppConfig', 'OverrideAppConfig', 'StorageAppConfig'];
	var extend = [];

	angular.forEach(sources, function(source) {
		var config = null;
		try {
			config = $injector.get(source);
		} catch(e) {
			config = {};
		}
		extend.push(config);
	});

	var AppConfig = {};
	extend.unshift(AppConfig);
	angular.extend.apply(this, extend); 
	$provide.constant('AppConfig', AppConfig);
});






