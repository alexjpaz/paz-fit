App.config(function(ComponentFactoryProvider) {
	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('c-calendar', function($scope) {

		$scope.cssForDay = function(day) {
			var css = [];
			if(day.isCurrentMonth) {
				css.push('c-calendar__day--current-month');
			}
			return css;
		};

		function Day() {
			this.date = null;
			this.isCurrentMonth = false;
		}

		function populateDays() {
			$scope.days = [];
			var i,n;
			i=0;
			n=(7*5)
			for(;i<n;i++) {
				$scope.days[i] = null;
			}

			var now = moment($scope.currentDate);
			var working = now.clone().startOf('month');
			var previous = working.clone();
			var daysInMonth = now.daysInMonth();
			var startingDay = working.day();

			i=startingDay;
			n=0;
			for(i;i>=n;i--) {
				var day = new Day();
				day.date = previous.clone();
				$scope.days[i] = day;
				previous.subtract('days',1);
			}


			i=startingDay;
			n=(daysInMonth+startingDay)
				for(;i<n;i++) {
					var day = new Day();
					day.date = working.clone();
					day.isCurrentMonth = true;
					$scope.days[i] = day;
					working.add('days',1);
				}

			i=(daysInMonth+startingDay);
			n=(i)+(7*5)-(daysInMonth+startingDay);
			console.log(i,n)
				for(;i<n;i++) {
					var day = new Day();
					day.date = working.clone();
					$scope.days[i] = day;
					working.add('days',1);
				}

		}
	
		populateDays();
	});
}); 
