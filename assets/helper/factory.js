angular.module('helper/factory', [])
.config(function($provide, $compileProvider, $routeProvider) { 
	$provide.provider('TemplateResolver', function() {
		function TemplateResolver() {
			this.screen = function(screenName) {
				return 'assets/screen/'+screenName+'.html';
			};
		}

		this.$get = function() {
			return new TemplateResolver();
		};
	});

	$provide.provider('RouteBuilder', function(TemplateResolverProvider) {
		var TemplateResolver = TemplateResolverProvider.$get();

		function RouteBuilder() {
			this.when = function(urlPattern, screenName) {
				var routeConfigObj = {
					templateUrl: TemplateResolver.screen(screenName)
				};
				$routeProvider.when(urlPattern, routeConfigObj);
				var resourceFactoryFn = function ($resource) {
					return $resource(urlPattern, rurl);
				};
				$provide.factory(urlPattern, resourceFactoryFn);
			};
		}

		this.$get = function() {
			return new RouteBuilder();
		};
	});

	$provide.provider('ResourceFactory', function() {
		function ResourceFactory() {

			this.build = function(resouceName, rurl, paramDefaultsExtend, actionsExtend) {
				var resourceFactoryFn = function ($resource) {
					var  paramDefaults = {};
					var  actions = {

					};


					return $resource(rurl, paramDefaults, actions);
				};
				$provide.factory(resouceName, resourceFactoryFn);
			};
		}

		this.$get = function() {
			return new ResourceFactory();
		};
	});

	$provide.provider('DirectiveFactory', function() {
	  function ComponentFactory() {
		this.build = function(component_name, controllerDef) {

			var componentFactoryObjFn = function() {
				var componentFactoryObj = {
					restrict: 'EA',
					template: 'assets/components/'+component_name+'.html',
					controller: controllerDef,
				};

				return componentFactoryObj;
			};

			var componentName = component_name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() });
			$compileProvider.directive(componentName, componentFactoryObjFn);
		}
	  }

	  this.$get = function() {
		  return new ComponentFactory();
	  };
	});

	$provide.provider('ComponentFactory', function() {
	  function ComponentFactory() {
		this.build = function(component_name, controllerDef) {

			var componentFactoryObjFn = function() {
				var defaultComponentFactoryObj = {
					restrict: 'EA',
					templateUrl: 'assets/components/'+component_name+'.html',
					scope: true,
					compile: function() {
						head.load('assets/components/'+component_name+'.css');
					},
				};

				var componentFactoryObj = {'derp':'haha'};


				if(!angular.isObject(controllerDef)) {
					componentFactoryObj.controller = controllerDef;
					angular.extend(componentFactoryObj, defaultComponentFactoryObj);
				} else {
					angular.extend(componentFactoryObj, defaultComponentFactoryObj, controllerDef);
				}

				return componentFactoryObj;
			};

			var componentName = component_name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() });
			$compileProvider.directive(componentName, componentFactoryObjFn);
		}
	  }

	  this.$get = function() {
		  return new ComponentFactory();
	  };
	});

	$provide.provider('ScreenFactory', function() {
	  function ScreenFactory() {
		this.build = function(screen_name, controllerDef) {

			var screenFactoryObjFn = function() {
				var screenFactoryObj = {
					restrict: 'C',
					controller: controllerDef,
					compile: function() {
						head.load('assets/components/'+screen_name+'.css');
					},
				};

				return screenFactoryObj;
			};

			var screenName = screen_name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() });
			$compileProvider.directive(screenName, screenFactoryObjFn);
		}
	  }

	  this.$get = function() {
		  return new ScreenFactory();
	  };
	});
})

