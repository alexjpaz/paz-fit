App.config(function($provide, ComponentFactoryProvider) {

	$provide.factory('CalendarEventRepository', function() {
		function CalendarEventRepository() {
		};

		return CalendarEventRepository;
	});
	$provide.factory('CalenderView', function(CalendarEventRepository) {
	
		function CalendarDay() {
			this.date = null;
			this.events = null;
			this.isCurrentMonth = false;
		}

		function CalendarEventRepository() {
			this.events = {};
			this.get = function(date) {
				return this.events[date];
			};

			this.put = function(date, eventObj) {
				var ref = this.events[date];

				if(angular.isUndefined(ref)) {
					ref = [];
				}

				ref.push(eventObj);
			};
		}

		function CalendarView() {
			this.days = [];
			this.events = null;

			this.getDays = function() {
				return this.days;
			};
			
			this.setEvents = function(eventRepository) {
				this.events = eventRepository;
			};

			this.generateLayout = function(currentDate) {
				this.days = [];

				var i=null,n=null;
				var v = {
					cols: 7,
					rows: 5
				};

				/* Create 7 by 5 grid */
				n=(v.cols*v.rows);
				for(i=0;i<n;i++) {
					this.days[i] = null;
				}

				var now = moment(currentDate);
				var working = now.clone().startOf('month');
				var previous = working.clone();
				var daysInMonth = now.daysInMonth();
				var startingDay = working.day();

				/* previous month's days */
				i=startingDay;
				n=0;
				for(i;i>=n;i--) {
					var day = new CalendarDay();
					day.date = previous.clone();
					day.eventObj = this.events.get(day);

					this.days[i] = day;
					previous.subtract('days',1);
				}


				i=startingDay;
				n=(daysInMonth+startingDay)
					for(;i<n;i++) {
					var day = new CalendarDay();
					day.date = working.clone();
					day.isCurrentMonth = true;
					this.days[i] = day;
					working.add('days',1);
				}

				i=(daysInMonth+startingDay);
				n=(i)+(7*5)-(daysInMonth+startingDay);
				for(;i<n;i++) {
					var day = new CalendarDay();
					day.date = working.clone();
					this.days[i] = day;
					working.add('days',1);
				}
		}

		return Calendar;
	});


	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('c-calendar', function($scope, Calendar) {

		$scope.cssForDay = function(day) {
			var css = [];
			if(day.isCurrentMonth) {
				css.push('c-calendar__day--current-month');
			}
			return css;
		};

	
		populateDays();
	});
}); 
