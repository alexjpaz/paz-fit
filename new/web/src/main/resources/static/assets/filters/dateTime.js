angular.module('app').config(function($filterProvider) {

	$filterProvider.register('dateTime', function() {
		function dateTimeFilter(string, format) {
			var formatted;

			if(/fromNow/.test(format)) {
				formatted = moment(string).fromNow();	
			} else {
				formatted = moment(string).format(format);	
			}

			return formatted;
		}

		return dateTimeFilter;
	});

});
