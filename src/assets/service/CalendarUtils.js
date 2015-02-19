angular.module('app').service('CalendarUtils', function CalendarUtils(moment, Profile) {
	var dateFormat = Profile.get('dateFormat');

	function CalendarDateRange() {
		this.begin = null;
		this.end = null;
	}

	var CELLS = 4*7;
	/*
	 * Gets the date range for given date
	 */
	this.getCalendarRangeForToday = function() {
		var today = moment();

		var days = today.daysInMonth();

		var dateRange = new CalendarDateRange();
		dateRange.begin = today.clone().subtract('days', 30).format('YYYY-MM-DD');
		dateRange.end = today.clone().add('days', 30).format('YYYY-MM-DD');
		dateRange.today = today.format('YYYY-MM-DD');

		return dateRange;
	};
});
