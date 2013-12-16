describe('resources/repository', function() {

	var mock = {};

	describe('DatastoreSync', function() {

		beforeEach(function() {
			angular.module('app').config(function($provide, SchemaManagerProvider) {
				SchemaManagerProvider.addStore({
					name: '_metadata',
					indexes: [
						{keyPath: 'store'},
						{keyPath: 'modified'},
					]
				});

				SchemaManagerProvider.addStore({
					name: 'MockStore',
					keyPath: 'mockId',
				});
			});
			module('app');
		});

		beforeEach(inject(function($rootScope, $httpBackend) {
			mock = {};
			mock.$scope = $rootScope.$new();
			mock.$httpBackend = $httpBackend;
		}));

		beforeEach(inject(function(DatastoreSync, SchemaManager) {
			mock.DatastoreSync = DatastoreSync
			mock.SchemaManager = SchemaManager
		}));

		it('should retrieve data from the server and store in local DB', function(done) {
			var mdl = {
				url: '/rest/MockStore',
				data: {
					list: [
						{
							mockId: -1,
							mockField: 'A Mock Field'
						}
					],
				}
			};

			mock.$httpBackend.expectGET(mdl.url).respond(mdl.data);

			var mockData = {
				'test': 1
			};

			mock.DatastoreSync.refresh();

			mock.$httpBackend.flush();
			mock.$scope.$apply();
			done();
		});
	});
});
