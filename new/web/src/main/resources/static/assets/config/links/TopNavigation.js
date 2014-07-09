angular.module('app').config(function($provide) {

	$provide.factory('TopNavigation', function(NavigationGroup, NavigationLink) {
		NavigationConfiguration = [];
		var group = new NavigationGroup("GROUP");
		group.$add("Dashboard","/dashboard");
		group.$add("Settings","/developer/settings");
		NavigationConfiguration.push(group);

		return NavigationConfiguration;
	});
});
