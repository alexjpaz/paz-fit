App.config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('pr-list', function($scope, Database) {
		function getPersonalRecords(action) {
			Database.values('PersonalRecord').done(function(record) {
				console.debug('apaz',record);
				$scope.list = record;
				$scope.$apply();
			});
		}
		getPersonalRecords();
	});
});
