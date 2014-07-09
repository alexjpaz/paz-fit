angular.module('app').config(function($provide) {
	$provide.constant('ParamEnvironmentProfile', null);
	$provide.constant('DefaultAppConfig', {
			contextPath: '',
			portalMode: false,
			developerMode: false,
			restUrl: '/rest'
	});

	$provide.factory('Session', function() {
		var Session = {};
		return Session;
	});

	$provide.constant('DefaultUserSession', {
			firstName: 'John',
			lastName: 'Doe',
	});

	$provide.constant('EnvironmentProfiles', new function() {
		var profiles = {};
		profiles['full'] = {
		};
		profiles['inject.jsp'] = {
			reloadOnPathChange: true
		};

		this.get = function(profile) {
			return profiles[profile];
		}
	});
});
