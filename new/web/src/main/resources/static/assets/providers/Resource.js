angular.module('app').config(function($provide) {
	/**
	 * Resource
	 *
	 * Registers a service endpoint in the application (e.g. add user)
	 *
	 * @provider 
	 */
	 $provide.provider('Resource', function($provide, AppConfig) {
		 this.config = {
			 restUrl: AppConfig.restUrl
		 }
		 this.register = function(resourceName, resourceUrl, resourceExtendObj) {
			 if(resourceUrl.charAt(0) !== '/') {
				 console.log ("resourceURl should begin with a slash"); //TODO: consider including a console.js library so that we can use debug and warn
			 }
			 var concatResourceUrl = this.config.restUrl + resourceUrl;

			 var resourceFactoryFn = function($resource) {
				 if(angular.isUndefined(resourceExtendObj)) {
					 return $resource(concatResourceUrl);
				 } else {
					 return $resource(concatResourceUrl, resourceExtendObj.paramDefaults, resourceExtendObj.actions);
				 }
			 }

			 return $provide.factory(resourceName, resourceFactoryFn);
		 };

		 this.$get = function() {
			 return this;
		 }
	 });
});
