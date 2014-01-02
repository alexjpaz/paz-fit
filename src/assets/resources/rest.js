angular.module('app').config(function($provide,ResourceFactoryProvider) {
	var ResourceFactory = ResourceFactoryProvider.$get();

	ResourceFactory.build('Resource', '/rest/:model/:id');
	ResourceFactory.build('Api', '/api/:path/:subpath');
	
	ResourceFactory.build('PersonalRecord','/rest/PersonalRecord/:id');
	ResourceFactory.build('Max','/rest/Max/:id');
	ResourceFactory.build('Note','/rest/Note/:id');
})
