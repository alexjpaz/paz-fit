App.config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('c-calendar', function($scope) {

		(function populate_calendar() {
			$scope.days = [];

			for(var i=0;i<(7*5);i++) {
				$scope.days.push(i);
			}
		})();

		$scope.events = {
			'2013-12-1' : 'hi',
			'2013-12-5' : 'hi',
			'2013-12-7' : 'hi',
		};

		$scope.selectDay = function(day) {
			console.log(day);
		};

		var derp = '2013-12-5';
	});
}); 
