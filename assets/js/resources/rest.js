(function(angular) {
	var rest = angular.module('resources/rest', ['utils/factory']);
	
	rest.config(function(resourceFactoryProvider) {
		var ResourceFactory = resourceFactoryProvider.$get();
		
		ResourceFactory.build('User','/user/:userId');
		ResourceFactory.build('PersonalRecords','/personal-record');
		
	});
	
})(angular);


