angular.module('app',['ngResource','ngRoute'])
.config(function($provide, $compileProvider, $routeProvider) { 
	$provide.provider('ResourceFactory', function() {
		function ResourceFactory() {
			this.when = function(resouceName, rurl) {
				var resourceFactoryFn = function () {
					return $resource(resouceName, rurl);
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
					template: '/assets/components/'+component_name+'.html',
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
				var componentFactoryObj = {
					restrict: 'EA',
					templateUrl: '/assets/components/'+component_name+'.html',
					controller: controllerDef,
					scope: true,
					compile: function() {
						head.load('/assets/components/'+component_name+'.css');
					},
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

	$provide.provider('ScreenFactory', function() {
	  function ScreenFactory() {
		this.build = function(screen_name, controllerDef) {

			var screenFactoryObjFn = function() {
				var screenFactoryObj = {
					restrict: 'C',
					controller: controllerDef,
					compile: function() {
						head.load('/assets/components/'+screen_name+'.css');
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
.config(function($provide) {
	$provide.factory('ApplicationEnum', function($rootScope) {
		function ApplicationEnum() {
			this.LIFTS = ['press','deadlift','bench','squat'];
		}
		var instance = new ApplicationEnum();
		$rootScope.ApplicationEnum = instance;
		return instance;
	});
})
.config(function($provide,ResourceFactoryProvider) {
	var ResourceFactory = ResourceFactoryProvider.$get();

	ResourceFactory.build('Resource', '/rest/:model/:id');
	ResourceFactory.build('Api', '/api/:path/:subpath');
	
	ResourceFactory.build('PersonalRecord','/rest/PersonalRecord/:id');
	ResourceFactory.build('Max','/rest/Max/:id');
	ResourceFactory.build('Note','/rest/Note/:id');
})
.config(function($routeProvider) {
	$routeProvider.when('/dashboard', { templateUrl: '/assets/screen/dashboard.html' } );
})
.config(function($provide, ComponentFactoryProvider, ScreenFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	var ScreenFactory = ScreenFactoryProvider.$get();

	ComponentFactory.build('app-container', function($scope) {
		$scope.hello = 'world';
	});

	ComponentFactory.build('pr-list', function($scope, PersonalRecord) {
		$scope.records = PersonalRecord.query();

		$scope.addRecord = function(record) {
			PersonalRecord.save(record);
		};
	});

	ComponentFactory.build('plate-table', function($scope, Resource, Api) {
		$scope.sets = Api.get({
			path: 'table',
			subpath: 'week',
			max: 500,
			week: 531
		});
	});
	ComponentFactory.build('test-one', function($scope, Resource, Api) {
		$scope.max = Resource.get({
			model: 'Max',
		});

		$scope.pr = Resource.get({
			model: 'PersonalRecord',
		});

		$scope.table = Api.get({
			path: 'table',
			subpath: 'week',
			max: 500,
			week: 531
		});
	});

	ScreenFactory.build('screen-dashboard', function() {
	});
});
