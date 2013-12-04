App.config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('c-calendar', function($scope) {
		$scope.events = {
			'2013-12-1' : 'hi',
			'2013-12-5' : 'hi',
			'2013-12-7' : 'hi',
		};

		var derp = '2013-12-5';
	});
}); 
