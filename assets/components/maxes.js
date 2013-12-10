App.config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('maxes', function($scope, Database) {
		Database.values('Maxes').done(function(records) {
			$scope.maxes = records;
			$scope.$apply();
		});
	});
});
