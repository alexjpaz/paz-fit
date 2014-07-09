angular.module('app').config(function($provide) {
	$provide.provider('Component', function($compileProvider, StringHelperProvider, ComponentTemplateResolverProvider) {
		this.__componentIds = [];

		this.register = function(component_name, componentDefinition) {
			var componentName = StringHelperProvider.dashToCamel(component_name);

			this.__componentIds.push(component_name);

			var defaultComponentDefinition = {
				restrict: 'EA',
				scope: true,				
			};

			var finalComponentDefinition = {}

			finalComponentDefinition.templateUrl = ComponentTemplateResolverProvider.resolve(component_name, componentDefinition.componentGroup);

			angular.extend(finalComponentDefinition, defaultComponentDefinition, componentDefinition);

			var componentDefinitionFn = function() {
				return finalComponentDefinition;
			};

			$compileProvider.directive(componentName, componentDefinitionFn);
		};

		this.$get = function() {
			return this;
		};
	});
});
