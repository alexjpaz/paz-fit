angular.module('app').config(function($provide) {

	$provide.factory('DefaultNavaigationConfiguration', function(NavigationGroup, NavigationLink) {
		NavigationConfiguration = [];

		var group = new NavigationGroup("Dashboard");
		group.$add("Home","/dashboard");
		NavigationConfiguration.push(group);

		var group = new NavigationGroup("Watcher");
		group.$add("List","/watcher");
		NavigationConfiguration.push(group);

		return NavigationConfiguration;
	});
});
