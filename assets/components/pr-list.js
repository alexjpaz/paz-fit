App.config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('pr-list', function($scope, RestRepository) {
		function getPersonalRecords(action) {
			RestRepository[action]('PersonalRecord').then(function(entity) {
				$scope.dto = entity;
			});
		}

		$scope.refresh = function() {
			getPersonalRecords('refresh');
		};


		getPersonalRecords('refresh');
	});
});
