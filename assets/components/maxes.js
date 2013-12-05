App.config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('maxes', function($scope, RestRepository) {
		function getPersonalRecords(action) {
			RestRepository[action]('Max').then(function(entity) {
				$scope.maxes = response.list.Max[0];
			});
		}

		$scope.refresh = function() {
			getPersonalRecords('refresh');
		};
	});
});
