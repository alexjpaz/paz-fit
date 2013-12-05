describe('resources/repository', function() {

	var mock = {};

	beforeEach(module('app'));
	
	beforeEach(inject(function($rootScope, RestRepository, Storage, $httpBackend) {
		mock.$scope = $rootScope.$new();
		mock.RestRepository = RestRepository;
		mock.Storage = Storage;
		mock.$httpBackend = $httpBackend;

		mock.Storage.remove('Mock');
	}));


	it('should use Storage to find entities', function(done) {

		var mockData = {
			'test': 1
		};

		mock.Storage.set('Mock', mockData);

		var promise = mock.RestRepository.find('Mock');

		promise.then(function(data) {
			expect(mockData).to.deep.equal(data)
			done();
		});

		mock.$scope.$apply();
	});

	it('should use use rest to find entities and save in Storage', function(done) {

		///mock.Storage.get('Mock');

		var promise = mock.RestRepository.find('Mock');

		promise.then(function(data) {
			console.log(data);
			done();
		});

		mock.$scope.$apply();
	});

});
