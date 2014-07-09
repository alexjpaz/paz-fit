angular.module('app').config(function($provide,$filterProvider) {
    $filterProvider.register('fromNow', function(moment){
      return function(date) {
		  var fromNow = 'Never';

		  if(date !== null && angular.isDefined(date)) {
			fromNow = moment(date).fromNow();
		  }

		  return fromNow; 
      };
    });
});
