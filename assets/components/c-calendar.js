angular.module('app').config(function($provide, ComponentFactoryProvider) {

	$provide.factory('CalendarEvent', function() {
		function CalendarEvent() {
			this.isCurrentMonth = false;
		}

		return CalendarEvent;
	});

	$provide.factory('CalendarDay', function() {
		function CalendarDay() {
			this.date = null;
			this.events = null;
			this.isCurrentMonth = false;
		}

		return CalendarDay;
	});

	$provide.factory('CalendarEventRepository', function() {
		function CalendarEventRepository() {
			this.events = {};

			this.get = function(dateKey) {
				var ev =  this.events[dateKey];
				return ev;
			};

			this.put = function(date, eventObj) {
				var ref = this.events[date];

				if(angular.isUndefined(ref)) {
					this.events[date] = [];
					ref = this.events[date]; 
				}

				ref.push(eventObj);
			};
		}

		return CalendarEventRepository;
	});

	$provide.factory('CalendarView', function(CalendarEventRepository, CalendarDay) {
		function CalendarView() {
			this.days = [];
			this.events = null;

			this.getDays = function() {
				return this.days;
			};
			
			this.setEvents = function(eventRepository) {
				this.events = eventRepository;
			};

			this.__newDay = function(dateObj) {
				var day = new CalendarDay();
				day.date = dateObj.clone();
				if(this.events) {
					day.events = this.events.get(day.date.format('YYYY-MM-DD'));
				}

				return day;
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
					this.days[i] = this.__newDay(previous);
					previous.subtract('days',1);
				}

				/* current month */
				i=startingDay;
				n=(daysInMonth+startingDay)
					for(;i<n;i++) {
					this.days[i] = this.__newDay(working);
					this.days[i].isCurrentMonth = true;
					working.add('days',1);
				}

				/* next month */
				i=(daysInMonth+startingDay);
				n=(i)+(7*5)-(daysInMonth+startingDay);
				for(;i<n;i++) {
					this.days[i] = this.__newDay(working);
					working.add('days',1);
				}

				this.days[startingDay+now.date()-1].isToday = true;
		}

		}
		return CalendarView;
	});


	var ComponentFactory = ComponentFactoryProvider.$get();
	ComponentFactory.build('c-calendar', {
		scope: {'events':'='},
		controller: function($scope, Database, CalendarView, CalendarEventRepository) {
			$scope.cssForDay = function(day) {
				if(day == null) return;
				var css = [];
				if(day.isCurrentMonth) {
					css.push('c-calendar__day--current-month');
				}
				if(day.isToday) {
					css.push('c-calendar__day--today');
				}

				return css;
			};

			$scope.showDayMenu = function() {
				console.log('ho');
			};

			$scope.calendar = new CalendarView();
			$scope.calendar.setEvents($scope.events);
			$scope.$watch('events', function() {
				$scope.calendar.generateLayout();
			}, true);
		}
	});
}); 
