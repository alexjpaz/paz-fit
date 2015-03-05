/*
 * Module: helper
 *
 */
angular.module('helper',[])
.config(function(){})
.run(function(){})

angular.module('helper')
.config(function($provide, $compileProvider, $routeProvider) { 
	$provide.provider('AssetLoader', function() {
		function AssetLoader() {
			this.load = function(headPackage, callback) {
				if(angular.isUndefined(callback)) {
					 callback = angular.noop;
				}
				head.load(headPackage, callback);
			};

			this.screen = function(screenName, callback) {
				this.load('assets/screen/'+screenName+'.js', callback);
				//this.load('assets/screen/'+screenName+'.css');
			};
		}

		this.$get = function() {
			return new AssetLoader();
		};
	});
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

