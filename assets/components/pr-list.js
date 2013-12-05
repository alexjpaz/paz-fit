App.config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('pr-list', function($scope, RestRepository) {
		RestRepository.find('PersonalRecord').then(function(entity) {
			$scope.dto = entity;
		});

		$scope.refresh = function() {
			RestRepository.refresh('PersonalRecord').then(function(entity) {
				$scope.dto = entity;
			});
		};
	});
});
