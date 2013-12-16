describe('resources/repository', function() {

	var mock = {};

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

	beforeEach(function() {
		module('app');
	});

	describe('DatastoreSync', function() {


		beforeEach(inject(function($rootScope, $httpBackend) {
			mock = {};
			mock.$scope = $rootScope.$new();
			mock.$httpBackend = $httpBackend;
		}));

		beforeEach(inject(function(DatastoreSync, SchemaManager, Database) {
			mock.DatastoreSync = DatastoreSync;
			mock.SchemaManager = SchemaManager;
			mock.Database = Database;
		}));

		it('should retrieve data from the server and store in local DB', function(done) {
			var mdl = {
				url: '/rest/MockStore',
				data: {
					list: {
						"MockStore" : [
							{
								mockId: -1,
								mockField: 'A Mock Field'
							}
						]	
					}	
				}
			};

			mock.$httpBackend.expectGET(mdl.url).respond(mdl.data);

			mock.DatastoreSync.pull();

			mock.$httpBackend.flush();
			mock.$scope.$apply();

			mock.Database.values('MockStore').done(function(records) {
				expect(records[0].mockId).to.equal(mdl.data.list.MockStore[0].mockId);
				done();
			});
		});

		it('should push changes from the server', function(done) {
			var mdl = {
				url: '/rest/MockStore',
				data: {
					list: {
						"MockStore" : [
							{
								mockId: -1,
								mockField: 'A Mock Field'
							}
						]
					}
				}
			};

			mock.$httpBackend.expectPOST(mdl.url, mdl.data).respond(mdl.data);

			var promise = mock.DatastoreSync.push();

			promise.finally(function() {
				console.debug(arguments);
			});

			mock.$scope.$apply();

		});
	});
});
