angular.module('app').config(function($provide) {
	$provide.value('NavigationLink', function NavigationLink(label, href) {
		this.label = label;
		this.href = href;
	});
});
