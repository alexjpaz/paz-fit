angular.module('app').config(function($provide) {
	$provide.provider('Directive', function($compileProvider, StringHelperProvider) {
		this.register = function(directive_name, directiveDefinitionFn) {
			var componentName = StringHelperProvider.dashToCamel(directive_name);
			$compileProvider.directive(componentName, directiveDefinitionFn);
		};

		this.$get = function() {
			return null;
		};
	});
});
