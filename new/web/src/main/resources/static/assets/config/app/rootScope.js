angular.module('app').run(function($rootScope, $injector, ApplicationEnumResource) {
	try {
		$rootScope.AppConfig = $injector.get('AppConfig');
		$rootScope.Session = $injector.get('Session');


		$rootScope.Enum = ApplicationEnumResource.get();
	} catch (e) {
		throw Error("could not set up $rootScope\n" + e.stack);
	}

	//$rootScope.ApplicationEnum = $injector.get('ApplicationEnum');
});
