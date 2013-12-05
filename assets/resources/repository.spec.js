describe('resources/repository', function() {
	App = angular.module();
	require('http://code.angularjs.org/1.2.3/angular-mocks.js');

	var mock = {};
	
	mock.mod = angular.module('test', ['components/output-target','resources/rest']);
	beforeEach(module('test'));
	
	beforeEach(inject(function($rootScope, RestRepository) {
		mock.$scope = $rootScope.$new();
		mock.RestRepository = RestRepository;
	}));

	it('should store', function() {
		console.log(mock.RestRepository);
	});
});
