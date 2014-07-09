angular.module('app').config(function($provide) {
	$provide.provider('StringHelper', function() {
		function _dashToCamel(g) { 
			return g[1].toUpperCase() 
		}

		this.camelToDash = function(string) {
			return string.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
		}

		this.dashToCamel = function(string) {
			return string.replace(/-([a-z])/g, _dashToCamel);
		};

		this.$get = function() {
			return this;
		};
	});
});
