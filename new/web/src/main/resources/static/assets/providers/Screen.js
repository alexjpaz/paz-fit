angular.module('app').config(function($provide) {
	/**
	* Screen
	*
	* Registers a screen directive
	* The name of the controller should match the class name of the screen templates div
	*
	* e.g. 'screen-user-edit'
	*
	* You would use a screen controller when you need to share logic or data between a multiple
	* blocks or components
	*/
	$provide.provider('Screen', function($compileProvider, StringHelperProvider, TemplateResolverProvider, $controllerProvider) {
		this.__screenIds = [];

		this.register = function(screen_class_name, componentDefinition) {
			var componentName = StringHelperProvider.dashToCamel(screen_class_name);

			this.__screenIds.push('screen-class-name');
			var finalComponentDefinition = {}



			var defaultComponentDefinition = {
				restrict: 'C',
				scope: true,
			};

			var componentDefinitionFn = function(AppConfig, $injector, $controller) {
				defaultComponentDefinition.link = function() {
					AppConfig.pageTitle = finalComponentDefinition.pageTitle || "NO_PAGE_TITLE";
				};
				angular.extend(finalComponentDefinition, defaultComponentDefinition, componentDefinition);

				// LOCALS
				var controllerName = componentName+'Controller';
				$controllerProvider.register(controllerName, componentDefinition.controller)
				finalComponentDefinition.controller = null;
				finalComponentDefinition.link =  function(scope, element, attrs) {
					var screenControllerLocals = {
						$scope: scope,
						$element: element,
						$attrs: attrs,
						// Add localInjectables here
					};
					$controller(controllerName, screenControllerLocals);
				}
				return finalComponentDefinition;
			};

			$compileProvider.directive(componentName, componentDefinitionFn);
		};

		this.$get = function() {
			return this;
		};
	});
});
