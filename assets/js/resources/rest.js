(function(angular) {
	var rest = angular.module('resources/rest', ['utils/factory']);
	
	rest.config(function(resourceFactoryProvider) {
		var ResourceFactory = resourceFactoryProvider.$get();
		
		ResourceFactory.build('Person','/person/:personId');
		ResourceFactory.build('PersonMaxes','/person/:personId/max');
		ResourceFactory.build('PersonalRecords','/person/:personId/personal-record');
		
	});
	
})(angular);


