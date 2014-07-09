angular.module('app').config(function($provide) {
	$provide.factory('NavigationGroup', function(NavigationLink) {
		function NavigationGroup(label) {
			this.label = label;
			this.links = [];
			this.$add = function(label,href) {
				this.links.push(new NavigationLink(label, href));
			};
		}

		return NavigationGroup;
	});
});
