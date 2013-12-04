angular.module('app',['ngResource','ngRoute','helper/factory'])
.config(function($provide){
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

	ComponentFactory.build('pr-list', function($scope, PersonalRecord) {
		$scope.records = PersonalRecord.get();
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
.run(function(App){
});
