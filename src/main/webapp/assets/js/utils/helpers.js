(function(angular){
	
	var app = angular.module('utils/helpers', []);
	
	app.provider('StringUtil', function() {
		function StringUtil() {
			this.toDash = function(string) {
				return string.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
			}
			
			this.toCamelCase = function(string) {
				return string.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() });
			}
		}
		
		
		this.$get = function() {
			return new StringUtil();
		};
	});
	
	app.provider('TemplateUtil', function() {
		function TemplateUtil() {
			this.resolve = function(turl) {
				return 'assets/partials/'+turl+'.html';
			}
		}
		
		this.$get = function() {
			return new TemplateUtil();
		}
	});
	
})(angular);