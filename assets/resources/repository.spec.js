describe('resources/repository', function() {

	var mock = {};

	beforeEach(module('app'));
	
	beforeEach(inject(function($rootScope, RestRepository) {
		mock.$scope = $rootScope.$new();
		mock.RestRepository = RestRepository;
	}));

	it('should store', function() {
		var promise = mock.RestRepository.find('Max');
		console.log('apaz',promise);

		promise.then(function() {

			console.log('apaz','hello');
		});

	});
});
