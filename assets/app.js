var app = angular.module('app',['ngResource','ngRoute','helper/factory']);
var RootApp = app;

app.config(function($provide){
	$provide.factory('App', function($rootScope, ApplicationEnum) {
		function App() {
		}
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
.config(function($provide, ComponentFactoryProvider, ScreenFactoryProvider) {

	var ComponentFactory = ComponentFactoryProvider.$get();
	var ScreenFactory = ScreenFactoryProvider.$get();

	ComponentFactory.build('app-container', function($scope) {
		$scope.hello = 'world';
	});
	
	ComponentFactory.build('nav-top', function($scope) {
	});

	ComponentFactory.build('pr-list', function($scope, PersonalRecord) {
		$scope.dto = PersonalRecord.get();
	});

	ComponentFactory.build('pr-add', function($scope, PersonalRecord) {
		$scope.dto = {}
		$scope.dto.PersonalRecord = new PersonalRecord();

		$scope.addRecord = function(record) {
			PersonalRecord.save(record);
		};
	});

	ComponentFactory.build('plate-table', {
		controller: function($scope, $attrs, Resource, Api) {
			$scope.sets = Api.get({
				path: 'table',
				subpath: 'week',
				max: 500,
				week: 531
			});
		},
		scope: {'max':'=','week':'='}
	});
	ComponentFactory.build('test-one', function($scope, Resource, Api) {

	});

	ScreenFactory.build('screen-dashboard', function() {
	});
})
.config(function($injector, ScreenFactoryProvider) {
	var ScreenFactory = ScreenFactoryProvider.$get();

	app.lazy = {
		ScreenFactory: ScreenFactory.build,
        //controller: $controllerProvider.register,
        //directive: $compileProvider.directive,
        //filter: $filterProvider.register,
        //factory: $provide.factory,
        //service: $provide.service,
        //animation: $animationProvider.register
    };

})
.run(function(App){
});
