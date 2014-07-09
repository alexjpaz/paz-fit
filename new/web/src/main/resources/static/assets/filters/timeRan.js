angular.module('app').config(function($provide,$filterProvider) {
    $filterProvider.register('timeRan', function(moment){
      return function(date) {
		  return moment.duration(date).humanize();
      };
    });
});
